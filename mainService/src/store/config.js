export const  config = {
    googleClientId : '90832106606-pqtgjjtb6bs0u290d95hbf3ndsc0h1in.apps.googleusercontent.com',
    googleClientSecret : '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',
    googleOauthRedirectUrl : 'http://localhost:8080/auth/oauth/google',
    publicKey: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp4uyDm/7LW624BPONxtr
nraJvrc8Uc/sJPvXy3z/zSh//GZSd6Ah2oCazdr+H8rZbTevASc1WtlcQAqIO0kH
POkZHM9PEh7imihAlJIiv8GY7m95rPJknNjqgfA0SKj9fxsIqcIz4WQB+s2cWs0x
O0JhYdZGECif0y6ZuHZ2fx3NvLhE23bpsxaL6bsTz+6dYmHNvIur4P4n3Cgj554r
Tkt9aI68JHgZNnlZjb5r1B35dYCmHd9+CfvLt2G+sNfaGzqn7lzvRqhw0iC8GGYa
eClqo3FZSoy0XpotuNAd+1cBblOx8WkciUU4M5dye9yUINFmYoBYavaDfc8m4SHE
TQIDAQAB
-----END PUBLIC KEY-----`,
  privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAp4uyDm/7LW624BPONxtrnraJvrc8Uc/sJPvXy3z/zSh//GZS
d6Ah2oCazdr+H8rZbTevASc1WtlcQAqIO0kHPOkZHM9PEh7imihAlJIiv8GY7m95
rPJknNjqgfA0SKj9fxsIqcIz4WQB+s2cWs0xO0JhYdZGECif0y6ZuHZ2fx3NvLhE
23bpsxaL6bsTz+6dYmHNvIur4P4n3Cgj554rTkt9aI68JHgZNnlZjb5r1B35dYCm
Hd9+CfvLt2G+sNfaGzqn7lzvRqhw0iC8GGYaeClqo3FZSoy0XpotuNAd+1cBblOx
8WkciUU4M5dye9yUINFmYoBYavaDfc8m4SHETQIDAQABAoIBAQCla9W3T3TNnJxO
jP9zhU0yfMNvW3bgx8s9kLG1JYtiQfRrfZM6rQ3/sC4nxWpWdW9K2Emfd9jEBAuC
52MuNaJBz1uOCFjnaTsOPWPVzJsmfLzD3ahiy0fvXHPdKw5UFxWCI2zgPu/+P0F9
IPiY5jMPcTC46lhup811MnNvnvbL9UXJSafSRqhuus/kLNYbeYbvKhn/xhcyIVi3
9K+LbezBHrqhgoNHcf3Ct5fQAKFg/fjd7h8y7wNhdNXt0TZ638jxRa5AHD8aLlGf
fDCmxqjF05j/YVwOhamzKPDTPsAhon6EJuZRwq/DfHArNwaZyZ2m3d5Nkdrxe0QJ
QPXsnCN5AoGBANiCGhKMrreiEHxBPwhvE9kDApw6nGolvz1uiY4EMQ3iLoLSoomF
OICZVYS8IQJNgAv+D5VKEI21Tk750USFHa26iFcwNWdPpaw44Dhs9elpkNQWrxX9
fQEL4Tkk9iA4twkbh5A37dp/DM3f4YBJ8B9LEqM3GHsKCjw0iNjvLV9HAoGBAMYb
RyT1kns0xLUmDGsvKgbwgLL50dtxYuhFUofNpQaCyQCRE1a8YMT2N0dXUnktvm7/
gTgR/FEkFblPScy5SuPCMcyLwaJiPP+WtHFlOTtRYLylS3SrPVMFrII89K7so4/R
UvBSptvg0fyUO/LXNBu0SMFmOmuGc7760vTJUJHLAoGAKEcL0qeZWVAtAPCiaU9A
wf5tXeMJdjXPff4yWNkuxwZs4KmO00aVXFcqMadN/L+uMozxGTTOH467IrYW2Ehr
XQZ2lsHBLZcDmyZ5kAW1OdcJumr953lg5/Dt1VOq9hOW+XrFnW7KMPuxxhsAOH2I
zkmJDhQR2dHkVY7wZmsYZcECgYEAjO1Ivg0H6CeQq4DmorUJg6hBFZDL7fyKLMtr
u3naJHiTPpj1leUqPdMdXd3LqLKW3uVZ6iY5RQuTfKDf0ggaM02pGWZuF/Mki3mM
4YHtpbntRCWeON+8HzxRDNEKCwoCDMQO6TESzCXxm2lkAAuBYRfuDc6ITod1/Wz2
9vXjH+MCgYBa+c91k08/epbtNBeLfQ4rVLqrsyPDIcVkKLdN6r2OzxP/kvtY+m3c
qnROWwNJOvwO5MjnM88gWQ6VGi7LXWTiJaWtTvOBbyDfO+ikz0/ZGRsnjzdE43Uy
lju8yRYEuickuLG1jTYDZv11oVc+tsjKHtV0lcxJzyqV3ZtgE9yE1A==
-----END RSA PRIVATE KEY-----`,
  kafka: {
    TOPIC: 'test',
    BROKERS: ['localhost:9092'],
    GROUPID: 'bills-consumer-group',
    CLIENTID: 'sample-kafka-client'
    }
}