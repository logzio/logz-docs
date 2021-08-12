###### For Windows:

```shell
wget https://dl.influxdata.com/telegraf/releases/telegraf-1.19.2_windows_amd64.zip
```

After downloading the archive, extract its contents into `C:\Program Files\Logzio\telegraf\`.

###### For MacOS:

```shell
brew install telegraf
```

###### For Linux:

**Ubuntu & Debian**

```shell
sudo apt-get update && sudo apt-get install telegraf
```

**RedHat and CentOS**

```shell
sudo yum install telegraf
```

**SLES & openSUSE**

```shell
# add go repository
zypper ar -f obs://devel:languages:go/ go
# install latest telegraf
zypper in telegraf
```

**FreeBSD/PC-BSD**

```shell
sudo pkg install telegraf
```
