BIN := ./node_modules/.bin
TEST_FILES := test/support/env.js $(shell find test/specs -type f -name "*.js")

VERSION := $(shell node -e "console.log(require('./package.json').version)")

# Our 'phony' make targets (don't involve any file changes)
.PHONY: test bdd lint release

# Run Mocha, with standard reporter.
test:
	@TEST_MODE=true $(BIN)/mocha -r cylon --colors $(TEST_FILES)

# Run Mocha, with more verbose BDD reporter.
bdd:
	@TEST_MODE=true $(BIN)/mocha -r cylon --colors -R spec $(TEST_FILES)

# Run JSHint
lint:
	@$(BIN)/jshint ./lib

release:
	@git tag -m "$(VERSION)" v$(VERSION)
	@git push --tags
	@npm publish ./
