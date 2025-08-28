
.PHONY: setup
setup:
	bash -c "source ~/.nvm/nvm.sh && nvm use node"

.PHONY: run
run:
	docker-compose down
	pnpm dev:python


run-nestjs:
	pnpm run dev:nestjs

.PHONY: clean-build
clean-build:
	cd apps/backend
	pnpm install
	cd ../..
	pnpm run build