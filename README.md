# icofy
A tool to convert images to favicons 🚀

## Install
```
$ npm install --global icofy
```

## Usage
```
Usage: icofy <image> <output>

A tool to convert images to favicons 🚀

Options:
  --which <icons...>  specify the icons
  -v, --version       output the current version
  -h, --help          display help for command
```

By default, no additional platform favicons will be generated. <br/>
To include these, use the ```which``` option followed by the icons to include. Seperate the icons by comma.

```
icofy test.png . --which android,apple,firefox,coast,firefox,yandex
```


## Related

[favicons](https://github.com/itgalaxy/favicons) - Used for this module

## License
MIT © [Cresco Innovations](https://github.com/crescoinnovations)