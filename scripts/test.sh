echo "test build processing ...";

sudo apt update && sudo apt upgrade -y

nvm i 15.0.1

rm build

mkdir build;

cp -r ./public ./build

echo "Build finish !"