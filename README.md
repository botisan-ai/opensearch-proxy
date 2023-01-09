# AWS OpenSearch Proxy

This is a quick and dirty proxy for connecting to AWS OpenSearch Service locally with AWS credentials without having to do too much of a setup. It signs the AWS headers for you using your local credentials. It is mainly used for development purposes.

Currently it works with making requests to the OpenSearch service, but unfortunately not for the dashboards, since the frontend header logic is more complicated. A good alternative is to use [Elasticvue](https://github.com/cars10/elasticvue) to connect since OpenSearch is compatible with Elasticsearch v7.

# Usage

- clone the repo
- install dependencies using `yarn`
- run `yarn start` to start the proxy

# License

MIT
