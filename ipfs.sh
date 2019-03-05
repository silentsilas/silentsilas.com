#! /bin/bash
# Publish to IPFS!

rm -r public/
mkdir public

hugo --destination public/

# add to ipfs
hash=$(ipfs add -r -q public/ | tail -n 1)

# pin new version
pin=$(ipfs pin add $hash)
dt=$(date '+%d/%m/%Y %H:%M:%S'):${hash}
# publish hash to ipns
# ipns=$(ipfs name publish $hash)

echo $dt >> versions.txt
