import nock from 'nock';
import { decodeJwt, wrapJwtInHeader } from '../jwt';
import {
  mockServiceBindings,
  onlyIssuerXsuaaUrl,
  testTenants
} from '../../../../../test-resources/test/test-util/environment-mocks';
import {
  expectAllMocksUsed,
  mockJwtBearerToken,
  mockServiceToken
} from '../../../../../test-resources/test/test-util/token-accessor-mocks';
import {
  mockInstanceDestinationsCall,
  mockSingleDestinationCall,
  mockSubaccountDestinationsCall,
  mockVerifyJwt
} from '../../../../../test-resources/test/test-util/destination-service-mocks';
import {
  onlyIssuerServiceToken,
  providerServiceToken,
  providerUserToken,
  subscriberServiceToken,
  subscriberUserToken
} from '../../../../../test-resources/test/test-util/mocked-access-tokens';
import {
  basicMultipleResponse,
  certificateMultipleResponse,
  certificateSingleResponse,
  destinationName,
  oauthClientCredentialsMultipleResponse,
  oauthClientCredentialsSingleResponse,
  oauthJwtBearerResponse,
  oauthJwtBearerSingleResponse,
  oauthMultipleResponse,
  oauthPasswordMultipleResponse,
  oauthPasswordSingleResponse,
  oauthRefreshTokenMultipleResponse,
  oauthRefreshTokenSingleResponse,
  oauthSingleResponse,
  oauthUserTokenExchangeMultipleResponse,
  oauthUserTokenExchangeSingleResponse,
  onPremiseBasicMultipleResponse,
  onPremiseBasicSingleResponse,
  onPremisePrincipalPropagationMultipleResponse
} from '../../../../../test-resources/test/test-util/example-destination-service-responses';
import { clientCredentialsTokenCache } from '../client-credentials-token-cache';
import { parseDestination } from './destination';
import { getDestination } from './destination-accessor';
import { destinationCache } from './destination-cache';
import {
  alwaysProvider,
  alwaysSubscriber
} from './destination-selection-strategies';

describe('authentication types', () => {
  afterEach(() => {
    clientCredentialsTokenCache.clear();
    destinationCache.clear();
  });

  describe('authentication type OAuth2SAMLBearerFlow', () => {
    it('returns a destination with authTokens if its authenticationType is OAuth2SAMLBearerFlow, subscriber tenant', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();
      mockJwtBearerToken();

      const httpMocks = [
        mockInstanceDestinationsCall(nock, [], 200, subscriberServiceToken),
        mockSubaccountDestinationsCall(
          nock,
          oauthMultipleResponse,
          200,
          subscriberServiceToken
        ),
        mockSingleDestinationCall(
          nock,
          oauthSingleResponse,
          200,
          destinationName,
          {
            ...wrapJwtInHeader(subscriberServiceToken).headers,
            'X-user-token': subscriberUserToken
          },
          { badheaders: [] }
        )
      ];

      const expected = parseDestination(oauthSingleResponse);
      const actual = await getDestination({
        destinationName,
        jwt: subscriberUserToken
      });
      expect(actual).toMatchObject(expected);
      expectAllMocksUsed(httpMocks);
    });

    it('returns a destination with authTokens if its authenticationType is OAuth2SAMLBearerFlow, provider tenant', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();
      mockJwtBearerToken();

      const httpMocks = [
        mockInstanceDestinationsCall(
          nock,
          oauthMultipleResponse,
          200,
          providerServiceToken
        ),
        mockSubaccountDestinationsCall(nock, [], 200, providerServiceToken),
        mockSingleDestinationCall(
          nock,
          oauthSingleResponse,
          200,
          destinationName,
          wrapJwtInHeader(providerUserToken).headers
        )
      ];

      const expected = parseDestination(oauthSingleResponse);
      const actual = await getDestination({
        destinationName,
        jwt: providerUserToken,
        cacheVerificationKeys: false
      });

      expect(actual).toMatchObject(expected);
      expectAllMocksUsed(httpMocks);
    });

    it('should use provider client credentials token for SystemUser exists in provider destination', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();

      const samlDestinationsWithSystemUser = { ...oauthMultipleResponse[0] };
      // Insert SystemUser in the retrieved OAuth2SAMLBearer destination to trigger principle propagation workflow
      samlDestinationsWithSystemUser['SystemUser'] = 'defined';

      const httpMocks = [
        mockInstanceDestinationsCall(
          nock,
          [samlDestinationsWithSystemUser],
          200,
          providerServiceToken
        ),
        mockSubaccountDestinationsCall(nock, [], 200, providerServiceToken),
        // This single destination call is the one triggered by the OAuth2SAMLBearerAssertion flow
        mockSingleDestinationCall(
          nock,
          oauthSingleResponse,
          200,
          destinationName,
          wrapJwtInHeader(providerServiceToken).headers
        )
      ];

      const expected = parseDestination(oauthSingleResponse);
      const actual = await getDestination({
        destinationName,
        cacheVerificationKeys: false
      });
      expect(actual).toMatchObject(expected);
      expectAllMocksUsed(httpMocks);
    });

    it('should use subscriber client credentials token for SystemUser exists in subscriber destination', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();

      const samlDestinationsWithSystemUser = { ...oauthMultipleResponse[0] };
      // Insert SystemUser in the retrieved OAuth2SAMLBearer destination to trigger principle propagation workflow
      samlDestinationsWithSystemUser['SystemUser'] = 'defined';

      const httpMocks = [
        mockInstanceDestinationsCall(
          nock,
          [samlDestinationsWithSystemUser],
          200,
          subscriberServiceToken
        ),
        mockSubaccountDestinationsCall(nock, [], 200, subscriberServiceToken),
        // This single destination call is the one triggered by the OAuth2SAMLBearerAssertion flow
        mockSingleDestinationCall(
          nock,
          oauthSingleResponse,
          200,
          destinationName,
          wrapJwtInHeader(subscriberServiceToken).headers
        )
      ];

      const expected = parseDestination(oauthSingleResponse);
      const actual = await getDestination({
        destinationName,
        cacheVerificationKeys: false,
        jwt: subscriberUserToken
      });
      expect(actual).toMatchObject(expected);
      expectAllMocksUsed(httpMocks);
    });
  });

  describe('authentication type OAuth2ClientCredentials', () => {
    it('returns a destination with authTokens if its authenticationType is OAuth2ClientCredentials, subscriber tenant', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();
      mockJwtBearerToken();

      const httpMocks = [
        mockInstanceDestinationsCall(nock, [], 200, subscriberServiceToken),
        mockSubaccountDestinationsCall(
          nock,
          oauthClientCredentialsMultipleResponse,
          200,
          subscriberServiceToken
        ),
        mockSingleDestinationCall(
          nock,
          oauthClientCredentialsSingleResponse,
          200,
          destinationName,
          wrapJwtInHeader(subscriberServiceToken).headers
        )
      ];

      const expected = parseDestination(oauthClientCredentialsSingleResponse);
      const actual = await getDestination({
        destinationName,
        jwt: subscriberUserToken
      });
      expect(actual).toMatchObject(expected);
      expectAllMocksUsed(httpMocks);
    });

    it('returns a destination with authTokens if its authenticationType is OAuth2ClientCredentials, provider tenant', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();
      mockJwtBearerToken();

      const httpMocks = [
        mockInstanceDestinationsCall(nock, [], 200, providerServiceToken),
        mockSubaccountDestinationsCall(
          nock,
          oauthClientCredentialsMultipleResponse,
          200,
          providerServiceToken
        ),
        mockSingleDestinationCall(
          nock,
          oauthClientCredentialsSingleResponse,
          200,
          destinationName,
          wrapJwtInHeader(providerServiceToken).headers
        )
      ];
      const expected = parseDestination(oauthClientCredentialsSingleResponse);
      const actual = await getDestination({ destinationName });
      expect(actual).toMatchObject(expected);
      expectAllMocksUsed(httpMocks);
    });

    it('returns a destination with authTokens if its authenticationType is OAuth2ClientCredentials, tokenServiceUrlType common and sets X-token header.', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();
      mockJwtBearerToken();

      const withTokenServiceType = {
        ...oauthClientCredentialsSingleResponse,
        tokenServiceURLType: 'Common'
      };

      const httpMocks = [
        mockInstanceDestinationsCall(nock, [], 200, providerServiceToken),
        mockInstanceDestinationsCall(nock, [], 200, subscriberServiceToken),
        mockSubaccountDestinationsCall(
          nock,
          [withTokenServiceType],
          200,
          providerServiceToken
        ),
        mockSubaccountDestinationsCall(nock, [], 200, subscriberServiceToken),
        mockSingleDestinationCall(
          nock,
          withTokenServiceType,
          200,
          destinationName,
          {
            ...wrapJwtInHeader(providerServiceToken).headers,
            'X-tenant': testTenants.subscriber
          },
          { badheaders: [] }
        )
      ];

      const expected = parseDestination(oauthClientCredentialsSingleResponse);
      const actual = await getDestination({
        destinationName,
        jwt: subscriberUserToken
      });
      expect(actual).toMatchObject(expected);
      expectAllMocksUsed(httpMocks);
    });
  });

  describe('authentication type OAuth2JWTBearer', () => {
    it('should use provider service token subscriber x-user-token for provider destination and subscriber jwt', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();
      mockJwtBearerToken();

      const httpMocks = [
        mockInstanceDestinationsCall(nock, [], 200, providerServiceToken),
        mockInstanceDestinationsCall(nock, [], 200, subscriberServiceToken),
        mockSubaccountDestinationsCall(nock, [], 200, subscriberServiceToken),
        mockSubaccountDestinationsCall(
          nock,
          oauthJwtBearerResponse,
          200,
          providerServiceToken
        ),
        mockSingleDestinationCall(
          nock,
          oauthJwtBearerSingleResponse,
          200,
          destinationName,
          {
            ...wrapJwtInHeader(providerServiceToken).headers,
            'x-user-token': subscriberUserToken
          },
          { badheaders: [] }
        )
      ];

      const expected = parseDestination(oauthJwtBearerSingleResponse);
      const actual = await getDestination({
        destinationName,
        jwt: subscriberUserToken
      });
      expect(actual).toMatchObject(expected);
      expectAllMocksUsed(httpMocks);
    });
  });

  describe('authentication type OAuth2RefreshToken', () => {
    it('returns a destination with auth token if authentication type is OAuth2RefreshToken', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();

      const httpMocks = [
        mockInstanceDestinationsCall(nock, [], 200, subscriberServiceToken),
        mockSubaccountDestinationsCall(
          nock,
          oauthRefreshTokenMultipleResponse,
          200,
          subscriberServiceToken
        ),
        mockSingleDestinationCall(
          nock,
          oauthRefreshTokenSingleResponse,
          200,
          destinationName,
          {
            ...wrapJwtInHeader(subscriberServiceToken).headers,
            'X-refresh-token': 'dummy-refresh-token'
          },
          { badheaders: [] }
        )
      ];

      const expected = parseDestination(oauthRefreshTokenSingleResponse);
      const actual = await getDestination({
        destinationName,
        jwt: subscriberUserToken,
        refreshToken: 'dummy-refresh-token'
      });
      expect(actual).toMatchObject(expected);
      expectAllMocksUsed(httpMocks);
    });

    it('fails if refresh token is not provided', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();

      const httpMocks = [
        mockInstanceDestinationsCall(nock, [], 200, subscriberServiceToken),
        mockSubaccountDestinationsCall(
          nock,
          oauthRefreshTokenMultipleResponse,
          200,
          subscriberServiceToken
        )
      ];
      await expect(
        getDestination({
          destinationName,
          jwt: subscriberUserToken
        })
      ).rejects.toThrowError(/No refresh token has been provided./);
      expectAllMocksUsed(httpMocks);
    });
  });
  describe('authentication type OAuth2UserTokenExchange', () => {
    it('should use the user provider token as auth header and no exchange header for provider destination and provider jwt', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();
      mockJwtBearerToken();

      const httpMocks = [
        mockInstanceDestinationsCall(nock, [], 200, providerServiceToken),
        mockSubaccountDestinationsCall(
          nock,
          oauthUserTokenExchangeMultipleResponse,
          200,
          providerServiceToken
        ),
        mockSingleDestinationCall(
          nock,
          oauthUserTokenExchangeSingleResponse,
          200,
          destinationName,
          wrapJwtInHeader(providerUserToken).headers
        )
      ];

      const expected = parseDestination(oauthUserTokenExchangeSingleResponse);
      const actual = await getDestination({
        destinationName,
        jwt: providerUserToken
      });
      expect(actual).toMatchObject(expected);
      expectAllMocksUsed(httpMocks);
    });

    it('should use the provider access token as auth header and subscriber jwt as exchange header for provider destination and provider jwt', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();
      mockJwtBearerToken();

      const httpMocks = [
        mockInstanceDestinationsCall(nock, [], 200, providerServiceToken),
        mockSubaccountDestinationsCall(
          nock,
          oauthUserTokenExchangeMultipleResponse,
          200,
          providerServiceToken
        ),
        mockSingleDestinationCall(
          nock,
          oauthUserTokenExchangeSingleResponse,
          200,
          destinationName,
          {
            ...wrapJwtInHeader(providerServiceToken).headers,
            'X-user-token': subscriberUserToken
          },
          { badheaders: [] }
        )
      ];

      const expected = parseDestination(oauthUserTokenExchangeSingleResponse);
      const actual = await getDestination({
        destinationName,
        selectionStrategy: alwaysProvider,
        jwt: subscriberUserToken
      });
      expect(actual).toMatchObject(expected);
      expectAllMocksUsed(httpMocks);
    });

    it('should use the subscriber access token as auth header and subscriber jwt as exchange header for provider destination and provider jwt', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();
      mockJwtBearerToken();

      const httpMocks = [
        mockInstanceDestinationsCall(nock, [], 200, subscriberServiceToken),
        mockSubaccountDestinationsCall(
          nock,
          oauthUserTokenExchangeMultipleResponse,
          200,
          subscriberServiceToken
        ),
        mockSingleDestinationCall(
          nock,
          oauthUserTokenExchangeSingleResponse,
          200,
          destinationName,
          {
            ...wrapJwtInHeader(subscriberServiceToken).headers,
            'X-user-token': subscriberUserToken
          },
          { badheaders: [] }
        )
      ];

      const expected = parseDestination(oauthUserTokenExchangeSingleResponse);
      const actual = await getDestination({
        destinationName,
        selectionStrategy: alwaysSubscriber,
        jwt: subscriberUserToken
      });
      expect(actual).toMatchObject(expected);
      expectAllMocksUsed(httpMocks);
    });
  });

  describe('authentication type ClientCertificateAuthentication', () => {
    it('returns a destination with certificates if the authentication type is ClientCertificateAuthentication, subscriber tenant', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();
      mockJwtBearerToken();

      const httpMocks = [
        mockInstanceDestinationsCall(nock, [], 200, subscriberServiceToken),
        mockSubaccountDestinationsCall(
          nock,
          certificateMultipleResponse,
          200,
          subscriberServiceToken
        ),
        mockSingleDestinationCall(
          nock,
          certificateSingleResponse,
          200,
          'ERNIE-UND-CERT',
          wrapJwtInHeader(subscriberServiceToken).headers
        )
      ];

      const actual = await getDestination({
        destinationName: 'ERNIE-UND-CERT',
        jwt: subscriberUserToken,
        cacheVerificationKeys: false
      });
      expect(actual!.certificates!.length).toBe(1);
      expect(actual!.keyStoreName).toBe('key.p12');
      expect(actual!.keyStorePassword).toBe('password');
      expectAllMocksUsed(httpMocks);
    });

    it('returns a destination with certificates if the authentication type is ClientCertificateAuthentication, provider tenant', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();
      mockJwtBearerToken();

      const httpMocks = [
        mockInstanceDestinationsCall(nock, [], 200, providerServiceToken),
        mockSubaccountDestinationsCall(
          nock,
          certificateMultipleResponse,
          200,
          providerServiceToken
        ),
        mockSingleDestinationCall(
          nock,
          certificateSingleResponse,
          200,
          'ERNIE-UND-CERT',
          wrapJwtInHeader(providerServiceToken).headers
        )
      ];

      const actual = await getDestination({
        destinationName: 'ERNIE-UND-CERT',
        cacheVerificationKeys: false
      });
      expect(actual!.certificates!.length).toBe(1);
      expect(actual!.keyStoreName).toBe('key.p12');
      expect(actual!.keyStorePassword).toBe('password');
      expectAllMocksUsed(httpMocks);
    });
  });

  describe('authentication type BasicAuthentication', () => {
    it('returns a destination with OnPrem connectivity and basic auth', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();

      mockInstanceDestinationsCall(nock, [], 200, subscriberServiceToken);
      mockSubaccountDestinationsCall(
        nock,
        onPremiseBasicMultipleResponse,
        200,
        subscriberServiceToken
      );
      mockSingleDestinationCall(
        nock,
        onPremiseBasicSingleResponse,
        200,
        destinationName,
        wrapJwtInHeader(subscriberServiceToken).headers
      );

      const actual = await getDestination({
        destinationName: 'OnPremise',
        jwt: subscriberUserToken,
        cacheVerificationKeys: false,
        selectionStrategy: alwaysSubscriber
      });
      expect(actual?.proxyConfiguration).toMatchObject({
        host: 'proxy.example.com',
        port: 12345,
        protocol: 'http',
        headers: { 'Proxy-Authorization': expect.stringMatching(/Bearer.*/) }
      });
    });

    it('returns a destination without authTokens if its authenticationType is Basic', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      const serviceTokenSpy = mockServiceToken();

      const httpMocks = [
        mockInstanceDestinationsCall(nock, [], 200, subscriberServiceToken),
        mockSubaccountDestinationsCall(
          nock,
          basicMultipleResponse,
          200,
          subscriberServiceToken
        )
      ];

      const expected = parseDestination(basicMultipleResponse[0]);
      const actual = await getDestination({
        destinationName,
        jwt: subscriberUserToken,
        cacheVerificationKeys: false
      });
      expect(actual).toMatchObject(expected);
      expect(serviceTokenSpy).toHaveBeenCalled();
      expectAllMocksUsed(httpMocks);
    });
  });

  describe('authentication type Principal Propagation', () => {
    it('returns a destination with onPrem connectivity and principal propagation', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();

      const httpMocks = [
        mockInstanceDestinationsCall(nock, [], 200, subscriberServiceToken),
        mockSubaccountDestinationsCall(
          nock,
          onPremisePrincipalPropagationMultipleResponse,
          200,
          subscriberServiceToken
        )
      ];

      const actual = await getDestination({
        destinationName: 'OnPremise',
        jwt: subscriberUserToken,
        cacheVerificationKeys: false,
        selectionStrategy: alwaysSubscriber
      });
      expect(actual?.proxyConfiguration).toMatchObject({
        host: 'proxy.example.com',
        port: 12345,
        protocol: 'http',
        headers: {
          'Proxy-Authorization': expect.stringMatching(/Bearer.*/),
          'SAP-Connectivity-Authentication': expect.stringMatching(/Bearer.*/)
        }
      });
      expectAllMocksUsed(httpMocks);
    });

    it('fails for Principal Propagation and no user JWT', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();

      const httpMocks = [
        mockInstanceDestinationsCall(nock, [], 200, providerServiceToken),
        mockSubaccountDestinationsCall(
          nock,
          onPremisePrincipalPropagationMultipleResponse,
          200,
          providerServiceToken
        )
      ];

      await expect(
        getDestination({ destinationName: 'OnPremise' })
      ).rejects.toThrowError(
        "No user token (JWT) has been provided. This is strictly necessary for 'PrincipalPropagation'."
      );
      expectAllMocksUsed(httpMocks);
    });

    it('fails for Principal Propagation and issuer JWT', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();

      const httpMocks = [
        mockInstanceDestinationsCall(nock, [], 200, onlyIssuerServiceToken),
        mockSubaccountDestinationsCall(
          nock,
          onPremisePrincipalPropagationMultipleResponse,
          200,
          onlyIssuerServiceToken
        )
      ];

      await expect(
        getDestination({
          destinationName: 'OnPremise',
          iss: onlyIssuerXsuaaUrl
        })
      ).rejects.toThrowError(
        "No user token (JWT) has been provided. This is strictly necessary for 'PrincipalPropagation'."
      );
      expectAllMocksUsed(httpMocks);
    });
  });

  it('works for onPremise Basic and issuer JWT', async () => {
    mockServiceBindings();
    mockVerifyJwt();
    mockServiceToken();

    const httpMocks = [
      mockInstanceDestinationsCall(nock, [], 200, onlyIssuerServiceToken),
      mockSubaccountDestinationsCall(
        nock,
        onPremiseBasicMultipleResponse,
        200,
        onlyIssuerServiceToken
      )
    ];

    const dest = await getDestination({
      destinationName: 'OnPremise',
      iss: onlyIssuerXsuaaUrl
    });

    const proxyToken =
      dest?.proxyConfiguration!.headers!['Proxy-Authorization'].split(' ')[1];
    expect(decodeJwt(proxyToken!).zid).toEqual(testTenants.subscriberOnlyIss);
    expectAllMocksUsed(httpMocks);
  });

  describe('authentication type SamlAssertion', () => {
    it('receives the saml assertion in the destination', async () => {
      const httpMocks = [
        mockInstanceDestinationsCall(nock, [], 200, providerServiceToken),
        mockSubaccountDestinationsCall(
          nock,
          oauthPasswordMultipleResponse,
          200,
          providerServiceToken
        ),
        mockSingleDestinationCall(
          nock,
          oauthPasswordSingleResponse,
          200,
          destinationName,
          wrapJwtInHeader(providerServiceToken).headers
        )
      ];

      const expected = parseDestination(oauthPasswordSingleResponse);
      const actual = await getDestination({ destinationName });
      expect(actual).toMatchObject(expected);
      expectAllMocksUsed(httpMocks);
    });
  });

  describe('authentication type OAuth2Password', () => {
    it('returns a destination with auth token if authentication type is OAuth2Password', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();
      mockJwtBearerToken();

      const httpMocks = [
        mockInstanceDestinationsCall(nock, [], 200, providerServiceToken),
        mockSubaccountDestinationsCall(
          nock,
          oauthPasswordMultipleResponse,
          200,
          providerServiceToken
        ),
        mockSingleDestinationCall(
          nock,
          oauthPasswordSingleResponse,
          200,
          destinationName,
          wrapJwtInHeader(providerServiceToken).headers
        )
      ];

      const expected = parseDestination(oauthPasswordSingleResponse);
      const actual = await getDestination({ destinationName });
      expect(actual).toMatchObject(expected);
      expectAllMocksUsed(httpMocks);
    });
  });
});
