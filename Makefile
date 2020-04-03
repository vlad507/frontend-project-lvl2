install:
				npm install
link: 
				sudo npm link
publish:
				npm publish --dry-run
test:
				npx jest
test-coverage:
				npm test -- --coverage
lint:
				npx eslint .