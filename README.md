# triv_AI

Trivia game using AI generated images as clues

### Install brew

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

### Install dependencies

```sh
brew install node
brew install watchman
sudo gem install cocoapods
npm i -g yarn
```

### Install code

```sh
cd react-native-web-typescript
yarn install
cd ios
pod install
```

### Run

```sh
yarn ios
```

```sh
yarn android
```

```sh
yarn web
```

### Lint

```sh
yarn lint
```

### Test

```sh
yarn test
```

### Deploy

```sh
yarn build
```