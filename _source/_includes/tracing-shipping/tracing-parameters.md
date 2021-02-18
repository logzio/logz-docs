###### Parameters

| Parameter | Description | Required/Default|
|---|---|---|
| ACCOUNT_TOKEN | The Logz.io token for the Distributed Tracing account you want to send your data to: `<<TRACING-SHIPPING-TOKEN>>` . Required when you use the collector to ship traces to Logz.io.  [How do I look up my Distributed Tracing account token?](https://docs.logz.io/user-guide/accounts/finding-your-tracing-account-token)  | Required|
| REGION |  Your two-letter Logz.io account region code. Defaults to **US**, required only if your Logz.io region is different than US. You can find your region code in the [Available regions](https://docs.logz.io/user-guide/accounts/account-region.html#available-regions) table. | DEFAULT: _Blank (US East)_|