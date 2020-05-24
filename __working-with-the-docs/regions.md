# Regions

Regions are handled through this file:

* **_source/_data/logzio-regions.yml**: The regions themselves. See this file for usage.

Regions are rendered on these files:

* **_source/no-search/listener-ip-addresses.xml**: RSS feed, where each IP is its own entry. Used by Support.
* **_source/user-guide/accounts/account-region.md**: Templated table at the bottom of the page, shows regions.
* **_source/user-guide/log-shipping/listener-ip-addresses.md**: Templated page that lists IP addresses per region.
* **_source/api/logzio-public-api.yml**: The API doc makes use of regions, so this pulls them in through liquid templating.
