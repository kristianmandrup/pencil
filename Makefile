
REPORTER = dot

all: clean test docs

clean:
	@rm -rf docs

test:
	@./node_modules/.bin/mocha \
		--reporter $(REPORTER)

docs:
	@mkdir -p docs/pencil
	@node ./support/docs

.PHONY: clean test docs