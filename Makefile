create-env:
	@echo "VITE_REACT_API_URL=http://localhost:8000/api" > ./frontend/.env
	@echo ".env file created in ./frontend"

start-frontend:
	make create-env &
	cd ./frontend && npm run dev &
	wait

start-backend:
	cd ./backend && npm run dev

clean:
	@echo "Killing processes on ports 3000 and 8000..."
	@npx kill-port 3000 || true
	@npx kill-port 8000 || true

install-pkg:
	cd ./frontend && npm install
	cd ./backend && npm install

start-dev:
	make start-frontend &
	make start-backend &
	wait
