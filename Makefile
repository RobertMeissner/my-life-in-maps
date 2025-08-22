
setup:
	bash -c "source ~/.nvm/nvm.sh && nvm use node"

run:
	docker-compose down
	pnpm dev:python


run-nestjs:
	pnpm run dev:nestjs