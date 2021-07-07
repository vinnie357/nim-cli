# nim-cli
nodejs cli for NGINX instance manager
---
thanks for being awesome okta! https://developer.okta.com/blog/2019/06/18/command-line-app-with-nodejs

## install
```bash
npm install -g .
```
## uninstall
```bash
npm uninstall -g nim-cli
```
## examples

### oauth login okta
```bash
# export env vars
export OKTA_ORG_URL=https://{yourOktaOrgUrl}
export OKTA_CLIENT_ID={yourClientID}
export OKTA_SCOPES="openid profile email"
export OKTA_REDIRECT_PORT=8080
```
## Development

### devcontainer
---

includes:
- pre-commit
- go
- docker
- terraform
- terraform-docs
don't forget to add your git user config

```bash
git config --global user.name "myuser"
git config --global user.email "myuser@domain.com"
```
---

checking for secrets as well as linting is performed by git pre-commit with the module requirements handled in the devcontainer.

testing pre-commit hooks:
  ```bash
  # test pre commit manually
  pre-commit run -a -v
  ```
---
