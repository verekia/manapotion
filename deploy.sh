docker buildx build --platform linux/arm64 --load -t verekia/manapotion .
docker save -o /tmp/manapotion.tar verekia/manapotion
scp /tmp/manapotion.tar midgar:/tmp/
ssh midgar docker load --input /tmp/manapotion.tar
ssh midgar docker compose up -d manapotion
