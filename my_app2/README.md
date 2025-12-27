
http://localhost:32318/my_app2

tonnel

```ssh -p 2222 s466049@se.ifmo.ru -L 32318:helios.cs.ifmo.ru:32318```

```ssh -l s466049 -p 2222 se.ifmo.ru```

```cd wildfly-38.0.1.Final/standalone/deployments/

rm my_app2.war

rm my_app2.war.deployed```

```cd ~```

```scp -P 2222 my_app2.war s466049@se.ifmo.ru:~```

```mv my_app2.war wildfly-38.0.1.Final/standalone/deployments/```

```bash wildfly-38.0.1.Final/bin/standalone.sh```

