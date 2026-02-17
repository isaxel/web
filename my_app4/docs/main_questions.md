# 1.Платформа Java EE. Спецификации и их реализации.

## Введение в платформу

Jakarta EE — это открытая платформа для разработки enterprise-приложений на языке Java, предназначенная для создания масштабируемых, безопасных и переносимых систем. Она эволюционировала из Java EE, которая изначально разрабатывалась Oracle (ранее Sun Microsystems), но в 2017 году проект перешел под управление Eclipse Foundation под новым брендом Jakarta EE, чтобы избежать торговых марок Oracle. Это позволило сообществу активно развивать платформу без коммерческих ограничений.

- **Цели платформы**: Обеспечение стандартизации API для веб-сервисов, распределенных вычислений, persistence и других enterprise-компонентов. Фокус на portability (переносимости кода между серверами), security (безопасности) и scalability (масштабируемости). Jakarta EE ориентирована на cloud-native приложения, микросервисы и интеграцию с современными технологиями, такими как Kubernetes и Docker.
- **Актуальная версия**: Jakarta EE 11, выпущена 26 июня 2025 года. Минимальная версия Java SE — 17 (LTS), с поддержкой до Java 21 для новых фич, таких как Virtual Threads (виртуальные потоки для улучшения concurrency) и Java Records (неизменяемые классы для упрощения данных). TCK (Technology Compatibility Kit) обновлен для тестирования совместимости.
- **Профили платформы** (подмножества спецификаций для разных сценариев):
    - **Full Platform**: Полный набор (~25 спецификаций) для монолитных enterprise-систем с транзакциями, messaging и batch-обработкой.
    - **Web Profile**: Упрощенный набор для веб-приложений (фокус на Servlet, JSF, JPA, CDI, JAX-RS). Идеален для веб-серверов без тяжелой бизнес-логики.
    - **Core Profile**: Минимальный набор для микросервисов (CDI, JPA, JAX-RS, Bean Validation). Подходит для легковесных контейнеров.
- **Ключевые изменения в EE 11**: Введена 1 новая спецификация (Jakarta Data), обновлено 16 существующих. Убраны устаревшие фичи (например, EJB lite частично упрощен). Поддержка Java 21+ для производительности в облаке.

## Спецификации Jakarta EE

Спецификации — это стандарты API, описывающие интерфейсы и поведение, без конкретной реализации. Они разрабатываются сообществом через JCP (Java Community Process) и Eclipse. В EE 11 всего ~25 спецификаций, разделенных на категории. Каждая проходит TCK для верификации.

Ниже подробный список по категориям (версии для EE 11, ключевые фичи и примеры использования). Я выделил новую спецификацию и обновления.

### 1. Платформенные и профильные спецификации

|Спецификация|Версия|Описание и ключевые фичи|Пример использования|
|---|---|---|---|
|**Jakarta EE Platform**|11.0|Зонтичная спецификация, определяющая Full, Web и Core профили. Включает поддержку Virtual Threads и Records.|Развертывание полного enterprise-приложения на сервере вроде WildFly.|
|**Jakarta EE Web Profile**|11.0|Профиль для веб-приложений: фокус на UI и REST. Обновления для Java 17+.|Веб-приложение с JSF и JPA.|
|**Jakarta EE Core Profile**|11.0|Минимальный профиль для микросервисов: CDI + persistence + REST.|Микросервис с Quarkus.|

### 2. Веб-технологии

|Спецификация|Версия|Описание и ключевые фичи|Пример использования|
|---|---|---|---|
|**Jakarta Servlet**|6.0|API для обработки HTTP-запросов/ответов. Новое: поддержка Virtual Threads для async.|Servlet-фильтры для аутентификации в веб-приложении.|
|**Jakarta Server Faces (JSF)**|4.0|MVC-фреймворк для UI. Обновления: интеграция с CDI 4.0, поддержка Records.|Построение форм и страниц с компонентами вроде h:inputText.|
|**Jakarta MVC**|2.0|Action-based MVC. Улучшения для REST-интеграции.|Обработка действий в контроллерах для веб-страниц.|
|**Jakarta RESTful Web Services (JAX-RS)**|3.1|API для RESTful сервисов. Новое: JSON-B 3.0 для сериализации.|Создание @Path-аннотированных эндпоинтов для API.|
|**Jakarta WebSocket**|2.1|Полнодуплексная связь по WebSocket. Поддержка async.|Чат-приложение с реал-тайм обновлениями.|
|**Jakarta Portlet**|4.0|API для портлетов (модульные UI в порталах).|Интеграция в портал вроде Liferay.|

### 3. Persistence и данные

|Спецификация|Версия|Описание и ключевые фичи|Пример использования|
|---|---|---|---|
|**Jakarta Persistence (JPA)**|3.1|ORM для реляционных БД. Обновления: поддержка Records в entities.|@Entity-классы для маппинга таблиц, JPQL-запросы.|
|**Jakarta Data**|1.0 **(новая!)**|Repository-паттерн для доступа к данным (реляционным/NoSQL). Упрощает CRUD без boilerplate. Ключ: @Repository с методами вроде findById().|findAll() в репозитории для списка пользователей из БД.|
|**Jakarta NoSQL**|1.1|API для NoSQL (MongoDB, Cassandra). Обновления для интеграции с Data.|@Entity для документов в MongoDB.|
|**Jakarta XML Binding (JAXB)**|4.0|Маппинг XML <-> POJO. Улучшения для JSON-B.|Парсинг XML-конфигов в объекты.|

### 4. Бизнес-логика и компоненты

|Спецификация|Версия|Описание и ключевые фичи|Пример использования|
|---|---|---|---|
|**Jakarta Enterprise Beans (EJB)**|4.0|Компоненты для транзакций и распределения. Упрощения в lite-версии.|@Stateless бин для бизнес-методов с @Transaction.|
|**Jakarta Contexts and Dependency Injection (CDI)**|4.0|Управление зависимостями и контекстами. Новое: async events.|@Inject для внедрения бинов, @Produces для фабрик.|
|**Jakarta Interceptors**|2.1|Перехватчики методов/событий. Интеграция с CDI.|@Interceptor для логирования вызовов.|

### 5. Messaging и Batch

|Спецификация|Версия|Описание и ключевые фичи|Пример использования|
|---|---|---|---|
|**Jakarta Messaging (JMS)**|3.1|Асинхронное messaging. Поддержка Virtual Threads.|@MessageDriven бин для очередей.|
|**Jakarta Batch**|2.1|Пакетная обработка с XML-джобами.|Job с chunk-oriented processing для ETL.|
|**Jakarta Mail**|2.1|API для email.|Отправка уведомлений через SMTP.|

### 6. Безопасность и валидация

|Спецификация|Версия|Описание и ключевые фичи|Пример использования|
|---|---|---|---|
|**Jakarta Security**|3.0|Аутентификация/авторизация. Интеграция с OAuth/JWT.|@RolesAllowed для ролей.|
|**Jakarta Authentication**|3.0|SPI для механизмов auth.|Custom IdentityStore для БД-аутентификации.|
|**Jakarta Validation (Bean Validation)**|3.1|Декларативная валидация. Новое: constraints для Records.|@NotNull, @Size на полях POJO.|

### 7. Другие (Concurrency, Config, Connectors)

|Спецификация|Версия|Описание и ключевые фичи|Пример использования|
|---|---|---|---|
|**Jakarta Concurrency**|3.0|Async задачи на уровне приложения. Поддержка Virtual Threads.|@Asynchronous для методов.|
|**Jakarta Config**|3.0|Внешняя конфигурация (properties/YAML).|@ConfigProperty для инъекции значений.|
|**Jakarta Connectors (JCA)**|2.1|Соединения с EIS (ERP-системы).|ResourceAdapter для legacy-систем.|
|**Jakarta XML Web Services (JAX-WS)**|4.0|SOAP-сервисы.|@WebService для эндпоинтов.|

- **Депрекации в EE 11**: Убраны старые фичи вроде CDI 1.0-compat, фокус на современных API.
- **TCK**: Обязательные тесты для каждой спецификации; отчеты публикуются на jakarta.ee.

## Реализации (серверы приложений)

Реализации — это runtime-среды (серверы), прошедшие TCK для полной совместимости. Они предоставляют контейнеры для развертывания приложений. Для EE 11 сертифицировано несколько вендоров (на октябрь 2025). Выбор зависит от нужд: full-stack (GlassFish) vs. microprofile (Quarkus).

|Продукт|Вендор|Поддерживаемые профили|Версия и дата релиза|Ключевые фичи и примечания|
|---|---|---|---|---|
|**Eclipse GlassFish**|Eclipse Foundation|Full, Web, Core|8.0.0 (июль 2025)|Официальная референсная реализация. Легковесный, с поддержкой Virtual Threads. Идеален для разработки.|
|**WildFly**|Red Hat|Full, Web, Core|34.0.0 (август 2025)|Модульный, высокопроизводительный. Интеграция с JBoss EAP для enterprise.|
|**Open Liberty**|IBM|Full, Web, Core|25.0.0.9 (июль 2025)|Легковесный, cloud-native. Часть OpenJ9 JVM для оптимизации.|
|**Payara Server**|Payara Services|Full, Web|7.0.0 (бета сентябрь 2025, full октябрь)|Форк GlassFish с кластерингом и Payara Micro для микросервисов. Полная сертификация TCK.|
|**Apache TomEE**|Apache|Web, Plus (JAX-RS+EJB)|10.0.0 (июль 2025)|TomEE+ для full web, легкий на базе Tomcat.|
|**Quarkus**|Red Hat|Core, Web (с extensions)|3.15.0 (август 2025)|Supersonic Subatomic Java: компилируется в native (GraalVM), для Kubernetes.|
|**Helidon**|Oracle|MicroProfile (частично EE: Web, Core)|4.0.6 (июль 2025)|Микрофреймворк: Helidon SE (reactive) и MP (managed).|
|**Spring Boot**|VMware|Web, Core (через starters)|3.3.0 (с Jakarta support, июль 2025)|Не full EE, но совместим с некоторыми specs; для гибридных проектов.|

# 2. Принципы IoC, CDI и Location Transpanency. Компоненты и контейнеры.


В контексте Jakarta EE (ранее Java EE) принципы **Inversion of Control (IoC)**, **Contexts and Dependency Injection (CDI)** и **Location Transparency** являются фундаментальными для создания модульных, тестируемых и масштабируемых enterprise-приложений. Они помогают отделить бизнес-логику от инфраструктуры, обеспечивая гибкость и переносимость кода.

- **IoC**: Общий принцип, где контроль над созданием и управлением объектами передается фреймворку, а не разработчику.
- **CDI**: Конкретная спецификация Jakarta EE для реализации IoC через dependency injection и управление контекстами жизненного цикла.
- **Location Transparency**: Принцип, позволяющий компонентам работать независимо от их физического расположения (локально или удаленно).

Эти концепции тесно связаны с **компонентами** (модульными единицами кода) и **контейнерами** (runtime-средами, управляющими ими). В Jakarta EE 11 (актуальная версия на октябрь 2025) CDI 4.0 усиливает интеграцию с другими спецификациями, такими как EJB и JPA.

## Принцип Inversion of Control (IoC)

IoC — это паттерн проектирования, где вместо того чтобы объекты сами создавали свои зависимости (например, new Object()), фреймворк (контейнер) берет на себя управление жизненным циклом объектов и их связями. Это "инверсия контроля" — от разработчика к контейнеру.

### Ключевые аспекты

- **Проблема без IoC**: Жесткие зависимости (tight coupling) приводят к трудно тестируемому коду. Пример: класс UserService напрямую создает DatabaseConnection — меняя БД, нужно переписывать сервис.
- **Решение с IoC**: Зависимости "инжектируются" извне. Фреймворк управляет scope (областью видимости), lifecycle (создание/уничтожение) и конфигурацией.
- **Типы IoC**:
    - **Dependency Injection (DI)**: Зависимости передаются через конструктор, setter или поле.
    - **Dependency Lookup**: Объекты запрашивают зависимости у контейнера (реже в EE, больше в Spring).
    - **Event-driven**: События управляют взаимодействием (в CDI через @Observes).

### Преимущества

- **Тестируемость**: Легко подменять моки в unit-тестах.
- **Модульность**: Компоненты переиспользуемы.
- **Масштабируемость**: Контейнер распределяет нагрузку.

### Пример кода (простой DI без CDI)

java

```
// Без IoC: tight coupling
public class UserService {
    private DatabaseConnection db = new DatabaseConnection(); // Жесткая зависимость
}

// С IoC (ручной DI)
public class UserService {
    private DatabaseConnection db;
    
    public UserService(DatabaseConnection db) { // Конструктор-инъекция
        this.db = db;
    }
}
```

В Jakarta EE IoC реализуется через CDI или EJB, где контейнер автоматически инжектирует зависимости.

## Contexts and Dependency Injection (CDI)

CDI — спецификация Jakarta EE (версия 4.0 в EE 11), стандартизирующая IoC для managed beans. Она определяет, как контейнер управляет зависимостями и контекстами (scopes). CDI интегрируется со всеми другими спецификациями EE, делая его "клеем" платформы.

### Основные принципы CDI

- **Managed Beans**: Любые POJO с аннотациями (@ApplicationScoped, @Dependent) становятся управляемыми контейнером.
- **Dependency Injection**: Автоматическая инъекция через @Inject. Поддержка qualifiers (@Named, @Qualifier) для разрешения неоднозначностей.
- **Contexts (Scopes)**: Контексты определяют lifecycle bean'а. Контейнер создает прокси для доступа к bean'ам в разных scopes.
- **Events и Interceptors**: Асинхронные события (@Observes) и перехватчики (@Interceptor) для AOP-подобного поведения.
- **Producer/Disposer**: @Produces для динамического создания bean'ов, @Disposes для cleanup.

### Типы Scopes в CDI 4.0

|Scope|Описание|Lifecycle|Пример использования|
|---|---|---|---|
|**@Dependent**|Зависим от инжектирующего bean'а (default).|По запросу|Временные объекты, как validators.|
|**@RequestScoped**|Живет в рамках HTTP-запроса (Servlet).|Per-request|Данные формы в JSF.|
|**@SessionScoped**|Живет в сессии пользователя.|Per-session|Корзина покупок.|
|**@ApplicationScoped**|Singleton на всю аппликацию.|App-wide|Кэш конфигурации.|
|**@ConversationScoped**|Долгий разговор (long-running).|Per-conversation|Многошаговые формы.|
|**@Singleton**|Единственный экземпляр (EJB-like).|App-wide|Глобальный сервис.|
|**@Pseudoscope** (новое в 4.0)|Кастомные scopes для Virtual Threads.|Custom|Async задачи в Java 21.|

### Пример кода CDI

```
// Qualifier для разрешения зависимостей
@Qualifier
@Target({FIELD, PARAMETER})
@Retention(RUNTIME)
public @interface Development {}

@Development
public class DevDatabaseConnection implements DatabaseConnection { ... }

// Producer
public class DatabaseProducer {
    @Produces
    @Development
    public DatabaseConnection devConnection() { return new DevDatabaseConnection(); }
}

// Consumer (инъекция)
@ApplicationScoped
public class UserService {
    @Inject @Development
    private DatabaseConnection db;  // Авто-инъекция
    
    public void saveUser(User user) {
        db.save(user);  // IoC в действии
    }
}
```



**Активация**: В beans.xml (META-INF/beans.xml) указать \<alternatives\> или \<stereotypes\>.

### Нововведения в CDI 4.0 (EE 11)

- Поддержка Java Records и Virtual Threads для async DI.
- Улучшенная интеграция с Jakarta Data и Security.
- Async events для reactive programming.

## Location Transparency

Location Transparency — принцип, при котором компоненты взаимодействуют так, будто они локальные, независимо от физического расположения (JVM, сервер, сеть). В Jakarta EE это достигается через прокси и stubs, скрывающие детали распределения.

### Ключевые аспекты

- **Прозрачность**: Клиент вызывает метод локально, контейнер решает, где исполнить (локально/удаленно).
- **Реализация в EE**:
    - **EJB**: Remote interfaces — прокси перенаправляют вызовы по RMI/IIOP.
    - **CDI + Portable Extensions**: Beans могут быть проксированы для распределения.
    - **JMS/Web Services**: Асинхронные вызовы через messaging или REST/SOAP.
- **Преимущества**: Легкое масштабирование (миграция на кластер), отказоустойчивость.
- **Ограничения**: Latency в сети, сериализация объектов (требует Serializable).

### Пример в EJB (с CDI)

java

```
// Remote interface (прозрачный)
@Remote
public interface UserServiceRemote {
    void saveUser(User user);
}

// EJB-имплементация
@Stateless
public class UserService implements UserServiceRemote {
    @Inject private DatabaseConnection db;  // CDI-инъекция
    
    @Override
    public void saveUser(User user) {
        db.save(user);
    }
}

// Клиент (локальный или удаленный вызов одинаков)
@EJB private UserServiceRemote service;  // Прокси скрывает location
service.saveUser(new User());  // Прозрачно!
```

## Компоненты в Jakarta EE

Компоненты — это модульные, управляемые единицы кода с четко определенным lifecycle и интерфейсами. Контейнер управляет ими через аннотации.

### Типы компонентов

|Тип|Спецификация|Описание|Аннотации|Пример|
|---|---|---|---|---|
|**Managed Beans**|CDI|POJO с DI и scopes.|@ApplicationScoped|Сервисы с @Inject.|
|**Enterprise JavaBeans (EJB)**|EJB 4.0|Для транзакций и распределения.|@Stateless, @Stateful|Бизнес-логика с @Transaction.|
|**Servlets/Filters**|Servlet 6.0|Веб-компоненты.|@WebServlet|Обработка запросов.|
|**JSF Managed Beans**|JSF 4.0|UI-компоненты.|@Named (CDI)|Контроллеры страниц.|
|**REST Resources**|JAX-RS 3.1|API-эндпоинты.|@Path|REST-сервисы.|
|**Message-Driven Beans**|JMS 3.1|Асинхронные.|@MessageDriven|Обработка очередей.|

- **Lifecycle**: @PostConstruct (init), @PreDestroy (cleanup). Контейнер вызывает автоматически.

## Контейнеры в Jakarta EE

Контейнеры — runtime-среды, реализующие спецификации. Они управляют компонентами, обеспечивая IoC, pooling, security и т.д.

### Типы контейнеров

|Тип|Описание|Поддержка|Пример реализации|
|---|---|---|---|
|**Bean Container**|Управляет CDI-beans (DI, scopes).|CDI 4.0|Weld (в WildFly, GlassFish).|
|**EJB Container**|Для EJB: транзакции, pooling.|EJB 4.0|OpenEJB (в TomEE).|
|**Web Container**|Для Servlet/JSF.|Servlet 6.0|Tomcat (в TomEE), Undertow (WildFly).|
|**Persistence Context**|Для JPA.|JPA 3.1|Hibernate (WildFly).|
|**Application Client Container**|Для клиентских apps.|EE Platform|GlassFish ACC.|

- **Иерархия**: Контейнеры вложены (Web внутри EJB). В микросервисах — легковесные (Quarkus CDI-container).
- **Управление**: Через CDI portable extensions для кастомизации.

### Пример развертывания

В WildFly: Развернуть WAR с beans.xml — контейнер сканирует и активирует компоненты.

## Заключение и рекомендации для изучения

IoC, CDI и Location Transparency делают Jakarta EE мощной для enterprise: от простых DI до распределенных систем. Связь: CDI реализует IoC, а Location Transparency использует контейнеры для прозрачности.

# 3. Управление жизненным циклом компонентов. Дескрипторы развёртывания.


В Jakarta EE контейнер управляет жизненным циклом компонентов (beans, EJB, servlets) автоматически: от создания до уничтожения, включая DI и scopes. Это реализует IoC и обеспечивает resource management. Дескрипторы развертывания (XML-файлы) — метаданные для конфигурации на deploy, с фокусом на portability. В EE 11 (октябрь 2025) приоритет аннотациям, но XML для overrides и legacy.

## Жизненный цикл компонентов

Контейнер (Weld для CDI, OpenEJB для EJB) сканирует аннотации/дескрипторы на deploy, управляет instantiation, DI, invocation и cleanup. Фазы зависят от типа и scope (CDI 4.0).

### Основные фазы

1. **Instantiation**: Создание экземпляра (lazy/eager по scope). DI через @Inject.
2. **Initialization**: @PostConstruct после DI — для setup (e.g., load config).
3. **Invocation**: Бизнес-методы в контексте scope. Interceptors применяются.
4. **Destruction**: @PreDestroy перед GC или scope-end — для cleanup (e.g., close connections).

Scopes влияют: @Dependent — per-injection; @RequestScoped — per-HTTP; @ApplicationScoped — app-wide singleton.

Таблица по типам (EE 11 фичи):

|Тип|Фаза init|Фаза destroy|Особенности|Пример|
|---|---|---|---|---|
|**CDI Bean**|@PostConstruct|@PreDestroy|Async support (Virtual Threads)|@ApplicationScoped: init на startup.|
|**EJB Stateless**|@PostConstruct (post-pool)|@PreDestroy (pre-pool return)|Pooling, no passivation.|@Stateless: methods from pool.|
|**Servlet**|init()|destroy()|Per-request service().|@WebServlet: load-on-startup=1 для eager.|
|**MDB**|@PostConstruct|@PreDestroy|Async onMessage().|JMS activation on queue bind.|

**Код-пример (CDI @ApplicationScoped)**:

java

```
@ApplicationScoped
public class UserCache {
    @Inject private DatabaseService db;
    
    @PostConstruct
    public void initialize() {
        cache.loadFrom(db);  // Setup после DI
    }
    
    public User find(Long id) { return cache.get(id); }  // Invocation
    
    @PreDestroy
    public void shutdown() {
        db.flush(cache);  // Cleanup
    }
}
```

Ошибки в @PostConstruct: bean не активируется, deploy fails.

Новое в EE 11: CDI 4.0 async lifecycle для @Asynchronous, интеграция с Concurrency 3.0.

## Дескрипторы развертывания

XML в META-INF/WEB-INF для declarative config. Парсятся на deploy; overrides аннотаций. Schema обновлены для Java 17+.

### Ключевые дескрипторы

|Файл|Назначение|Schema (EE 11)|Пример|
|---|---|---|---|
|**beans.xml**|CDI: alternatives, interceptors.|CDI 4.0|<beans><alternatives><class>DevService</class></alternatives></beans>|
|**web.xml**|Web: mappings, security.|Servlet 6.0|<servlet-mapping><url-pattern>/api/*</url-pattern></servlet-mapping>|
|**ejb-jar.xml**|EJB: beans, tx.|EJB 4.0|<session><ejb-name>Service</ejb-name><local>LocalIntf</local></session>|
|**persistence.xml**|JPA: units, providers.|JPA 3.1|<persistence-unit><provider>HibernatePersistenceProvider</provider></persistence-unit>|

**Пример web.xml**:

xml

```
<web-app xmlns="https://jakarta.ee/xml/ns/jakartaee" version="6.0">
    <servlet>
        <servlet-name>UserServlet</servlet-name>
        <servlet-class>com.example.UserServlet</servlet-class>
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>UserServlet</servlet-name>
        <url-pattern>/users/*</url-pattern>
    </servlet-mapping>
</web-app>
```

Интеграция: <load-on-startup> triggers init() как @PostConstruct.


# 4. Java EE API. Виды компонентов. Профили платформы Java EE.

Jakarta EE (ранее Java EE) — платформа для enterprise-приложений на Java, с набором API для стандартизации. API определяют интерфейсы для компонентов, без конкретной реализации — это спецификации вроде CDI, EJB. В версии 11 (июль 2025) фокус на cloud-native, Java 17+ и упрощении (e.g., Jakarta Data).

Компоненты — управляемые модули (beans, servlets), развертываемые в контейнерах. Профили — подмножества API для разных сценариев: Full для монолитов, Web для веб, Core для микросервисов. Всё обеспечивает portability между серверами (WildFly, GlassFish).

## Jakarta EE API: Основы

API — это стандарты (спецификации), описывающие, как работать с enterprise-функциями. Каждая API — пакет классов/интерфейсов, с TCK для тестирования. В EE 11 ~25 API, разделены по категориям.

### Ключевые категории API

|Категория|Примеры API (версия в EE 11)|Назначение|
|---|---|---|
|**Веб**|Servlet 6.0, JSF 4.0, JAX-RS 3.1|Обработка HTTP, UI, REST.|
|**Persistence**|JPA 3.1, Data 1.0|ORM, доступ к БД/NoSQL.|
|**Бизнес-логика**|EJB 4.0, CDI 4.0|Транзакции, DI, компоненты.|
|**Messaging**|JMS 3.1, Batch 2.1|Асинхронка, пакетная обработка.|
|**Безопасность**|Security 3.0, Validation 3.1|Auth, валидация.|
|**Другие**|Concurrency 3.0, Config 3.0|Async, конфигурация.|

Пример использования: @Inject из CDI API для DI. API интегрируются — e.g., JAX-RS с CDI для REST-beans.

## Виды компонентов

Компоненты — POJO с аннотациями, управляемые контейнером. Они реализуют бизнес-логику, с lifecycle (PostConstruct/PreDestroy). Разделены по спецификациям.

### Основные виды

|Вид|Спецификация|Описание|Аннотации/Интерфейсы|Пример|
|---|---|---|---|---|
|**Managed Beans**|CDI 4.0|Базовые POJO с DI и scopes.|@ApplicationScoped, @Inject|Сервис: @RequestScoped UserService с @Inject Repository.|
|**Session Beans**|EJB 4.0|Stateless/Stateful для транзакций.|@Stateless, @Stateful|@Stateless OrderProcessor: методы с @Transaction.|
|**Message-Driven Beans**|JMS 3.1|Асинхронные слушатели.|@MessageDriven|@MessageDriven EmailHandler: onMessage() для очередей.|
|**Servlets/Filters**|Servlet 6.0|Веб-обработчики.|@WebServlet, @WebFilter|@WebServlet("/api/users") UserServlet: doGet() для GET.|
|**JSF Beans**|JSF 4.0|UI-компоненты.|@Named (CDI)|@Named UserController: методы для форм.|
|**REST Resources**|JAX-RS 3.1|REST-эндпоинты.|@Path, @GET|@Path("/users") UserResource: @GET public List<User> getAll().|
|**Batch Jobs**|Batch 2.1|Пакетные задачи.|@BatchProperty|Job с ItemReader/Processor/Writer для ETL.|

Все компоненты: аннотации + lifecycle + DI. В EE 11 добавлены Data Repositories (@Repository) как новый вид.

**Код-пример (Session Bean)**:

java

```
@Stateless  // EJB-компонент
public class UserService {
    @Inject private UserRepository repo;  // CDI DI
    
    public void save(User user) {
        repo.persist(user);  // Бизнес-логика
    }
}
```

## Профили платформы

Профили — готовые наборы API для сценариев. EE 11 имеет три: Full (всё), Web (веб-фокус), Core (минимальный). Выбор по deployable unit (WAR/EAR).

### Сравнение профилей

|Профиль|API в наборе|Подходит для|Размер/Сложность|Пример развертывания|
|---|---|---|---|---|
|**Full Platform**|~25 (EJB, JMS, Batch + Web/Core)|Монолиты, enterprise.|Большой, с транзакциями.|EAR на WildFly: полный стек.|
|**Web Profile**|~12 (Servlet, JSF, JPA, CDI, JAX-RS)|Веб-приложения.|Средний, без heavy messaging.|WAR на TomEE: JSF + REST.|
|**Core Profile**|~5 (CDI, JPA, JAX-RS, Validation)|Микросервисы, облако.|Минимальный, легковесный.|JAR на Quarkus: REST + DB.|

- **Выбор**: Web/Core для новых проектов (экономия); Full для legacy. TCK для каждого.
- **Эволюция**: EE 11 убрал старые профили (Platform), добавил Core для native (GraalVM).

# 5. Компоненты EJB. Stateless & Stateful Session Beans. EJB Lite и EJB Full.

Enterprise JavaBeans (EJB) — спецификация Jakarta EE (версия 4.0 в EE 11, октябрь 2025) для создания бизнес-компонентов с поддержкой транзакций, concurrency, security и распределения. EJB-компоненты — это POJO с аннотациями, управляемые контейнером (EJB Container), который обеспечивает lifecycle, pooling и DI (через CDI).

Основные компоненты: Session Beans (Stateless/Stateful), Message-Driven Beans (MDB). Фокус на Session Beans — для бизнес-логики. EJB упрощен в EE 11: меньше boilerplate, интеграция с CDI и Virtual Threads. Развертывание в WAR/EAR; portability через TCK.

## Компоненты EJB: Основы

EJB-компоненты реализуют интерфейсы (local/remote) и аннотированы для контейнера. Контейнер управляет:

- **Lifecycle**: @PostConstruct/@PreDestroy, pooling.
- **Транзакции**: @TransactionAttribute (REQUIRED, SUPPORTS и т.д.).
- **Security**: @RolesAllowed.
- **Concurrency**: @Lock (READ/WRITE).

Типы компонентов:

|Тип|Описание|Когда использовать|
|---|---|---|
|**Session Beans**|Синхронная бизнес-логика.|Сервисы, обработка запросов.|
|**Message-Driven Beans**|Асинхронная (JMS).|Обработка сообщений из очередей.|
|**Singleton Beans**|Singleton с @Singleton.|Глобальные сервисы (e.g., кэш).|

Пример базового EJB:

java

```
@Stateless  // Аннотация для контейнера
@Local(UserServiceLocal.class)  // Local интерфейс
public class UserServiceImpl implements UserServiceLocal {
    @Inject private UserRepository repo;  // CDI DI
    
    @Override
    @TransactionAttribute(TransactionAttributeType.REQUIRED)
    public void save(User user) {
        repo.persist(user);  // Бизнес-метод с tx
    }
}
```

## Stateless Session Beans

Stateless Session Beans (@Stateless) — "без состояния": не хранят данные между вызовами. Идеальны для масштабируемых сервисов. Контейнер использует пул экземпляров: берет из пула, выполняет метод, возвращает.

### Ключевые фичи

- **Pooling**: Экземпляры переиспользуются; нет passivation.
- **Concurrency**: По умолчанию READ (множественные вызовы параллельно).
- **Remote/Local**: Поддержка распределения (RMI).
- **Преимущества**: Высокая производительность, легкий кластеринг.

| Аспект                   | Детали                                                                |
| ------------------------ | --------------------------------------------------------------------- |
| **Lifecycle**            | Создание в пуле; @PostConstruct на allocation, @PreDestroy на return. |
| **Состояние**            | Нет; каждый вызов — чистый.                                           |
| **Пример использования** | Обработка заказов: stateless, так как не помнит предыдущие.           |

**Код-пример**:

java

```
@Stateless
@Lock(LockType.READ)  // Разрешает параллельные чтения
public class OrderProcessor {
    
    @PostConstruct
    public void init() { /* Setup */ }
    
    public Order process(Order order) {
        // Логика без хранения состояния
        return order.calculateTotal();
    }
    
    @PreDestroy
    public void cleanup() { /* Release */ }
}
```

Вызов: @EJB private OrderProcessor processor; processor.process(new Order());

## Stateful Session Beans

Stateful Session Beans (@Stateful) — "с состоянием": хранят данные между вызовами (conversation-like). Подходят для сессий пользователя. Контейнер управляет одним экземпляром на клиент, с passivation (сериализация в БД при неактивности).

### Ключевые фичи

- **Состояние**: Поля сохраняются; привязка к клиенту (affinity).
- **Passivation/Activation**: @PrePassivate/@PostActivate для save/restore.
- **Concurrency**: По умолчанию WRITE (один поток за раз).
- **Преимущества**: Для long-running процессов; но тяжелее stateless.

|Аспект|Детали|
|---|---|
|**Lifecycle**|Создание per-client; passivation при таймауте, destroy на @Remove.|
|**Состояние**|Хранится в полях; клиент-specific.|
|**Пример использования**|Корзина покупок: помнит добавленные товары.|

**Код-пример**:

java

```
@Stateful
@Local(ShoppingCartLocal.class)
public class ShoppingCartBean implements ShoppingCartLocal {
    private List<Item> cart = new ArrayList<>();  // Состояние
    
    @PostActivate
    public void activate() { /* Restore */ }
    
    public void addItem(Item item) {
        cart.add(item);  // Сохраняет состояние
    }
    
    @Remove  // Завершает сессию
    public void checkout() {
        // Process cart
        cart.clear();
    }
    
    @PrePassivate
    public void passivate() { /* Save state */ }
}
```

Вызов: @EJB private ShoppingCartLocal cart; cart.addItem(item); (состояние сохраняется).

## EJB Lite и EJB Full

EJB Lite — упрощенная версия (в Web Profile), без "тяжелых" фич. EJB Full — полный набор (в Full Platform). Выбор по профилю: Lite для веб/микросервисов, Full для enterprise.

### Сравнение

|Аспект|EJB Lite|EJB Full|
|---|---|---|
|**Доступные бины**|Stateless, Singleton, MDB (ограничено).|Все: + Stateful, Remote.|
|**Транзакции**|CMT (container-managed), базовые.|+ BMT (bean-managed), JTA.|
|**Распределение**|Только local.|Local + remote (RMI/IIOP).|
|**Профиль**|Web/Core.|Full.|
|**Использование**|Легковесные apps (TomEE).|Монолиты (WildFly).|
|**EE 11 изменения**|Улучшена интеграция с CDI; Virtual Threads в Lite.|Полная поддержка Concurrency 3.0.|

- **Lite**: Нет Stateful, remote; но 90% фич для большинства случаев.
- **Миграция**: Аннотации совместимы; проверь TCK.

## Итог

EJB — для надежной бизнес-логики: Stateless для скорости, Stateful для сессий. Lite хватит для простоты, Full — для legacy/распределения. В EE 11 EJB интегрируется с CDI, снижая код.

# 6. Работа с электронной почтой в Java EE. JavaMail API.

Jakarta Mail — это спецификация (API) для работы с email в Jakarta EE (версия 2.1 в EE 11, релиз июнь 2025). Она позволяет отправлять, получать и обрабатывать письма: от простых текстовых сообщений до HTML с вложениями. В отличие от внешних библиотек (типа Apache Commons Email), Mail встроена в EE, работает с контейнером (WildFly, GlassFish) и интегрируется с CDI/EJB для транзакций.

**Почему Mail?** В enterprise-apps email — для уведомлений (регистрация, заказы), отчетов. API не "готовый почтовик" — это низкоуровневый инструмент: ты настраиваешь SMTP/IMAP вручную. Минимальная Java — 17. В EE 11: async-отправка через Virtual Threads, но базово синхронно.

**Где доступна?** Full и Web Profile (не Core — для микросервисов бери внешние). Реализация: Angus Mail (от Eclipse). Установка в standalone: Maven dep или JNDI-ресурс.

Ресурсы: Доки [jakarta.ee/specifications/mail/2.1](https://jakarta.ee/specifications/mail/2.1), туториал Mailtrap.

## Основы: Как устроен API

API — как конструктор писем: настраиваешь "сессию" (Session — глобальные настройки SMTP/IMAP), создаешь "сообщение" (Message — from/to/subject/content), отправляешь (Transport). Нет GUI — чистый код.

**Шаги работы**:

1. **Настройка**: Properties для сервера (host, port, auth).
2. **Сессия**: Session.getInstance() — "фабрика" сообщений.
3. **Сообщение**: MimeMessage — тело письма (текст/HTML, вложения).
4. **Отправка**: Transport.send() — по SMTP.
5. **Получение**: Store/Folder — чтение из ящика.

**Ключевые классы** (простая таблица):

|Класс|Что это|Зачем нужно|
|---|---|---|
|**Session**|Настройки почты (SMTP/IMAP).|Создать один раз на app, инжектировать в бины.|
|**MimeMessage**|Одно письмо (от кого, кому, тема, тело).|Основной объект: setFrom(), setText(), setContent().|
|**Transport**|"Почтальон" для отправки.|Transport.send(msg) — шлет по сети.|
|**Store/Folder**|Доступ к ящику (IMAP).|store.connect() — открыть inbox, читать сообщения.|
|**Multipart**|Контейнер для вложений/HTML.|Если письмо сложное: добавь части (текст + файл).|

**Ошибки новичков**: Забыть auth (для Gmail — app password), порт (587 для TLS). Тестируй на Mailtrap/SendGrid — не спамь реальные ящики.

## Отправка email: По шагам

Отправка — 80% использования Mail. Начни с простого текста, добавь HTML/файлы. Всё синхронно, но в EE можно async.

### 1. Простое текстовое письмо

**Что делаем**: Настраиваем SMTP (Gmail как пример), создаем сообщение, шлем.

**Шаг за шагом**:

- Импорты: import jakarta.mail.*; import jakarta.mail.internet.*;
- Properties: Укажи сервер (smtp.gmail.com), порт, TLS, auth.
- Session: С аутентификатором (логин/пароль).
- Message: Установи from/to/subject/text.
- Send: Transport.send().

**Код с объяснениями** (комментарии внутри):


```java
import jakarta.mail.*;  // Основные классы Mail
import jakarta.mail.internet.*;  // Для адресов и MIME
import java.util.Properties;

public class SimpleEmailSender {
    public static void main(String[] args) throws Exception {
        // Шаг 1: Настройки SMTP (для Gmail: включи 2FA и app password)
        Properties props = new Properties();
        props.put("mail.smtp.host", "smtp.gmail.com");  // Сервер отправки
        props.put("mail.smtp.port", "587");  // Порт с TLS
        props.put("mail.smtp.auth", "true");  // Включи авторизацию
        props.put("mail.smtp.starttls.enable", "true");  // Защита соединения

        // Шаг 2: Сессия с логином (анонимный класс для пароля)
        Session session = Session.getInstance(props, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("your.email@gmail.com", "your-app-password");
            }
        });

        // Шаг 3: Создай сообщение
        Message msg = new MimeMessage(session);
        msg.setFrom(new InternetAddress("your.email@gmail.com"));  // От кого
        msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse("friend@example.com"));  // Кому
        msg.setSubject("Привет из Jakarta Mail!");  // Тема
        msg.setText("Это простое тестовое письмо.");  // Тело (текст)

        // Шаг 4: Отправь
        Transport.send(msg);  // Синхронно: ждет ответа от сервера
        System.out.println("Письмо отправлено!");
    }
}
```

- **Тестирование**: Запусти, проверь inbox получателя. Ошибка? Проверь props (порт 465 для SSL).

### 2. HTML-письмо или с вложениями

**Что добавляем**: Multipart для смешанного контента (HTML + текст) или файлов. MimeMultipart — "коробка" с частями.

**Шаг за шагом**:

- Создай Multipart("alternative") для HTML/текст.
- Добавь BodyPart (части): одну для текста, одну для HTML.
- Для вложения: MimeBodyPart.attachFile().

**Код** (расширение простого):


```java
// ... (props и session как выше)

Message msg = new MimeMessage(session);
// ... (from, to, subject как выше)

// Для HTML: просто
msg.setContent("<h1>Привет!</h1><p>Это <b>жирный</b> текст.</p>", "text/html");

// Или Multipart (HTML + plain текст как fallback)
Multipart multipart = new MimeMultipart("alternative");  // "alternative" — выберет лучший
BodyPart textPart = new MimeBodyPart();  // Часть 1: простой текст
textPart.setText("Простой текст (если HTML не поддерживается)");
BodyPart htmlPart = new MimeBodyPart();  // Часть 2: HTML
htmlPart.setContent("<h1>Привет!</h1><p>Это HTML.</p>", "text/html");
multipart.addBodyPart(textPart);
multipart.addBodyPart(htmlPart);
msg.setContent(multipart);

// Вложение (PDF или картинка)
MimeBodyPart attachPart = new MimeBodyPart();
attachPart.attachFile(new java.io.File("/path/to/file.pdf"));  // Локальный файл
// Или из байтов: attachPart.setDataHandler(new DataHandler(new ByteArrayDataSource(bytes, "application/pdf")));
multipart.addBodyPart(attachPart);  // Добавь в multipart

Transport.send(msg);
```

- **Почему Multipart?** Получатели без HTML увидят текст. Вложения — отдельная часть, не портит тело.

### 3. Массовые рассылки (bulk)

**Проблема**: Gmail лимит 500/день. Решение: Батчи + паузы.

- Разбей список email на группы по 50.
- Используй ExecutorService для async (не блокируй).

**Код-сниппет**:


```java
import java.util.concurrent.*;

// В методе
List<String> emails = List.of("1@ex.com", "2@ex.com");  // Твой список
ExecutorService executor = Executors.newFixedThreadPool(5);  // 5 потоков
for (List<String> batch : partition(emails, 50)) {  // Функция разбиения (напиши сам)
    for (String to : batch) {
        executor.submit(() -> {
            try {
                // Создай msg для to, send
                Message msg = new MimeMessage(session);
                msg.setRecipients(..., InternetAddress.parse(to));
                // ... остальное
                Transport.send(msg);
            } catch (Exception e) { /* Лог */ }
        });
    }
    Thread.sleep(10000);  // Пауза 10 сек между батчами
}
executor.shutdown();
```

## Получение email: По шагам

Меньше используется, но для inbox-мониторинга (e.g., подтверждения).

**Шаг за шагом**:

- Properties для IMAP (imap.gmail.com:993).
- Store.connect() — подключись.
- Folder.open() — открой папку (INBOX).
- getMessages() — массив писем.
- Парсинг: getSubject(), getContent() (или Multipart).

**Код**:

```java
// ... импорты

Properties props = new Properties();
props.put("mail.store.protocol", "imaps");  // IMAP с SSL
props.put("mail.imap.host", "imap.gmail.com");
props.put("mail.imap.port", "993");

Session session = Session.getInstance(props);
Store store = session.getStore("imaps");
store.connect("your.email@gmail.com", "password");  // Логин

Folder inbox = store.getFolder("INBOX");
inbox.open(Folder.READ_ONLY);  // Только чтение

Message[] messages = inbox.getMessages(1, 10);  // Первые 10
for (Message msg : messages) {
    System.out.println("От: " + msg.getFrom()[0]);
    System.out.println("Тема: " + msg.getSubject());
    
    Object content = msg.getContent();
    if (content instanceof String) {
        System.out.println("Текст: " + content);
    } else if (content instanceof Multipart) {
        Multipart mp = (Multipart) content;
        for (int i = 0; i < mp.getCount(); i++) {
            BodyPart part = mp.getBodyPart(i);
            if (part.getContentType().contains("text/plain")) {
                System.out.println("Plain: " + part.getContent());
            }
        }
    }
}

inbox.close(false);  // Не удаляй
store.close();
```

- **Совет**: Для polling — таймер в EJB (@Schedule), но лучше webhook'и.

## Интеграция с Jakarta EE

В EE не пиши main() — инжектируй Session через JNDI (@Resource) в EJB/CDI-bean. Контейнер управляет ресурсами (pooling).

**Пример в EJB**:

java

```
@Stateless  // EJB для транзакций
public class NotificationService {
    @Resource(lookup = "java:jboss/mail/Default")  // JNDI в WildFly (настрой в standalone.xml)
    private Session mailSession;  // Инжектировано
    
    public void sendWelcome(String to, String name) {
        try {
            Message msg = new MimeMessage(mailSession);  // Используй injected
            msg.setFrom(...);
            msg.setRecipients(..., InternetAddress.parse(to));
            msg.setSubject("Добро пожаловать, " + name);
            msg.setText("Привет! Твой аккаунт готов.");
            Transport.send(msg);  // Авто-использует props из JNDI
        } catch (MessagingException e) {
            // Лог или throw
        }
    }
}
```

- **Настройка JNDI**: В server config: <resource-ref name="mail/Default"> с props (host/auth).
- **В CDI**: Producer-метод: @Produces Session createSession() { ... }.

# 7. JMS. Реализация очередей сообщений. Способы доставки сообщений до клиента. Message-Driven Beans.

JMS — это "почтовая служба" для программ в Java EE. Вместо того чтобы один сервис звонил другому и ждал ответа (и всё зависало, если второй тормозит), ты кидаешь "письмо" (сообщение) в общую "почту" (очередь или топик). Другой сервис берёт его, когда готов, и отвечает "принято".

**Зачем в реале?**

- **Магазин онлайн**: Пользователь кликнул "купить" — фронт сразу говорит "заказ принят", а обработку (оплата, склад) кидает в очередь. Сайт не тормозит, даже если банк медленный.
- **Банк**: Ты перевёл деньги — app сразу показывает "OK", а уведомление (SMS, email) уходит в топик, и все устройства получают копию. Если телефон выключен — сообщение подождёт.
- **Игра**: Игрок написал в чат — сообщение в топик, все в комнате видят мгновенно, без "подвисаний".

Без JMS всё синхронно: один шаг — и вся система стоп. JMS — асинхронно, надёжно, не теряет данные. В EE 11 (2025) оно проще: меньше кода, работает с твоими EJB/CDI.

## Очереди сообщений: Как это работает на практике

"Почта" — это брокер (типа ActiveMQ, запусти в Docker за минуту). Два вида "ящиков":

**Очередь (как очередь в кассу)**: Один отправитель кладёт задачу, один обработчик берёт (по порядку). Сообщение исчезает после обработки.

- **Пример**: В магазине заказ в очередь — один worker (сервис) берёт, платит, упаковывает. Если worker сломается — сообщение вернётся, не потеряется.
- **Как сделать**: Настрой брокер, в коде укажи @Resource Queue. Отправь producer.send(msg).

**Топик (как рассылка в WhatsApp-группе)**: Отправитель шлёт, все подписчики получают копию. Сообщение не исчезает.

- **Пример**: В банке "новый курс валют" — топик рассылает всем apps (веб, мобилка). Если мобилка off — durable (сохранит).
- **Как сделать**: Замени Queue на Topic, создай подписчика.

**Код отправки заказа (в простом сервисе)**:


```java
// В твоём контроллере (EJB или CDI)
@Resource private Queue orderQueue;  // "Ящик" для заказов (настрой в сервере)
@Resource private ConnectionFactory cf;  // Фабрика "почты"

public void handleBuy(String orderId) {
    try {
        // Подключись к почте
        Connection conn = cf.createConnection();
        conn.start();  // "Включи приём"
        Session sess = conn.createSession(false, Session.AUTO_ACKNOWLEDGE);  // "Авто-подтверждение"
        
        // Создай отправителя и письмо
        MessageProducer sender = sess.createProducer(orderQueue);
        TextMessage letter = sess.createTextMessage("Обработай заказ: " + orderId);
        
        sender.send(letter);  // Кинул в очередь
        
        // Закрой
        sess.close();
        conn.close();
        
        return "Заказ в работе!";  // Фронт отвечает сразу
    } catch (Exception e) {
        return "Ошибка, попробуй позже";  // Без паники
    }
}
```

- **В жизни**: Пользователь видит "принято" за 0.1 сек, обработка — через 5 мин.

## Как доставить сообщение клиенту: Sync или Async

"Доставка" — как получить письмо. Sync: сам иди за ним. Async: оно приходит само.

**Sync (сам жди, как проверка почты)**:

- **Пример**: Worker каждую минуту спрашивает "есть заказы?" — просто, но тратит время на пустые проверки.
- **Код** (в сервисе обработки):

java

```java
// ... conn, sess
MessageConsumer checker = sess.createConsumer(orderQueue);
TextMessage letter = (TextMessage) checker.receive(5000);  // Жди 5 сек
if (letter != null) {
    String orderId = letter.getText();
    // Обработай: оплати, сохрани
    System.out.println("Заказ " + orderId + " готов!");
}
```

- **Когда**: Для тестов или редких задач.

**Async (приходит само, как пуш в Telegram)**:

- **Пример**: В чате — сообщение падает сразу, без "обнови страницу".
- **Код**:


```java
MessageConsumer checker = sess.createConsumer(orderQueue);
checker.setMessageListener(msg -> {  // "Слушатель"
    if (msg instanceof TextMessage) {
        String orderId = ((TextMessage) msg).getText();
        // Обработай мгновенно
        System.out.println("Заказ " + orderId + " в работе!");
    }
});
conn.start();  // "Включи уведомления"
```

- **Когда**: Везде, где скорость важна.

## Message-Driven Beans: Автоматический обработчик

MDB — "робот-почтальон": EJB, который сам слушает очередь и обрабатывает. Контейнер (WildFly) создаёт несколько копий для нагрузки, добавляет транзакции (если ошибка — откат).

**Пример**: MDB для заказов в магазине — берёт из очереди, сохраняет, шлёт email.

- **Код** (разверни — и готово):

java

```java
@MessageDriven(  // "Я слушатель очереди"
    activationConfig = {
        @ActivationConfigProperty(propertyName = "destinationType", propertyValue = "jakarta.jms.Queue"),  // Тип
        @ActivationConfigProperty(propertyName = "destinationLookup", propertyValue = "java:/jms/queue/OrderQueue")  // Какая очередь
    }
)
public class OrderRobot implements MessageListener {  // "Слушатель"
    
    @Inject private OrderSaver saver;  // Твоя логика (CDI)
    @Inject private EmailSender mailer;  // Инжект email
    
    @Override
    public void onMessage(Message msg) {  // Авто-вызов при письме
        if (msg instanceof TextMessage) {
            String orderId = ((TextMessage) msg).getText();
            saver.saveToDB(orderId);  // Сохрани
            mailer.send("Заказ " + orderId + " готов!");  // Уведоми
            System.out.println("Робот обработал: " + orderId);
        }
        // Если ошибка — контейнер откатит, сообщение вернётся
    }
}
```

- **В жизни**: Разверни в WildFly — отправь заказ, робот возьмёт сам. Масштаб: 100 заказов/сек — пул роботов справится.

# 8. Понятие транзакции. Управление транзакциями в Java EE. JTA.

Транзакция — это "атомарная операция": либо всё прошло идеально (все шаги удались), либо ничего не изменилось (откат). В Jakarta EE (EE 11, 2025) транзакции — ключ к надёжности: без них в большом приложении (e.g., магазин) может быть хаос, если один шаг сломается (оплата прошла, но товар не списался).

Управление: Авто (контейнер решает) или ручное. JTA — стандартный API для этого в EE. Всё в Full Profile, работает с EJB/CDI/JPA. Зачем? Чтобы данные consistent, особенно с БД.

## Понятие транзакции: Что это такое

Транзакция — "пакет" операций, как банковский перевод: счёт A минус 100, счёт B плюс 100. Если минус удался, но плюс нет (БД упала) — откат всего, иначе потеря денег.

**Свойства (ACID)** — почему не сломается:

- **Atomicity (атомарность)**: Всё или ничего. Аналогия: Ты в магазине — платишь и берёшь товар. Если касса сломалась — ничего не берёшь.
- **Consistency (согласованность)**: После транзакции данные в порядке (e.g., баланс >0). В БД: правила (constraints) соблюдаются.
- **Isolation (изоляция)**: Твоя транзакция не мешает другим (e.g., другой перевод не видит "полуготовый" минус).
- **Durability (долговечность)**: После commit — данные сохранены навсегда (даже если сервер упал).

**В жизни**: Без ACID — хаос: в банке деньги "испаряются". В EE: Транзакция охватывает EJB-метод или JPA-save.

**Проблемы без транзакций**: Race condition (два перевода — минус 200, но плюс 100), dirty read (видишь некоммитнутые изменения).

## Управление транзакциями в Jakarta EE

В EE два подхода: **CMT (Container-Managed Transactions)** — контейнер (WildFly) сам начинает/заканчивает транзакцию (проще). **BMT (Bean-Managed Transactions)** — ты вручную (UserTransaction, для сложных случаев).

**Таблица сравнения**:

|Тип|Как работает|Когда использовать|Плюсы/Минусы|
|---|---|---|---|
|**CMT**|Аннотации (@TransactionAttribute): REQUIRED (по умолчанию, используй текущую tx), REQUIRES_NEW (новая tx). Контейнер commit/rollback.|EJB-методы, простые операции.|+ Авто, tx в CDI/EJB. - Меньше контроля.|
|**BMT**|UserTransaction utx = ...; utx.begin(); ... utx.commit()/rollback().|Нестандартные (e.g., nested tx).|+ Гибкость. - Больше кода, ошибки.|

**В EE 11**: Поддержка Virtual Threads (Java 21) для tx без блокировки. Интеграция с JPA (EntityManager в tx).

**Код CMT** (в EJB, для перевода):

java

```java
@Stateless
public class BankService {
    @PersistenceContext  // JPA для БД
    private EntityManager em;
    
    @TransactionAttribute(TransactionAttributeType.REQUIRED)  // Default: используй tx
    public void transfer(String from, String to, double amount) {
        // Шаг 1: Минус с from
        Account accFrom = em.find(Account.class, from);
        accFrom.setBalance(accFrom.getBalance() - amount);
        em.merge(accFrom);
        
        // Шаг 2: Плюс to (если ошибка здесь — откат всего!)
        Account accTo = em.find(Account.class, to);
        accTo.setBalance(accTo.getBalance() + amount);
        em.merge(accTo);
        
        // Контейнер commit'ит (если OK) или rollback (если exception)
    }
}
```

- **Что происходит**: Если шаг 2 fail (e.g., БД ошибка) — минус отменяется. Пользователь видит "OK" или "ошибка".

**BMT пример** (ручной, в CDI-bean):


```java
@Inject private UserTransaction utx;  // Инжект из JTA

public void manualTransfer(String from, String to, double amount) {
    try {
        utx.begin();  // Начни tx
        // Шаги как выше...
        em.merge(accFrom);
        em.merge(accTo);
        utx.commit();  // Всё OK — сохрани
    } catch (Exception e) {
        utx.rollback();  // Откат
        // Лог
    }
}
```

## JTA: Что это и как работает

JTA (Jakarta Transactions API) — "дирижёр" транзакций в EE: стандарт для распределённых tx (несколько БД, JMS). Не спецификация сама, а API (jakarta.transaction.*) для CMT/BMT. В EE 11: Версия 2.0, с улучшениями для async.

**Роль**: Обеспечивает 2PC (two-phase commit) — для multi-resource (e.g., БД + JMS: сохрани заказ в БД и кинь в очередь атомарно).

**Компоненты**:

- **UserTransaction**: Для BMT (utx.begin/commit).
- **TransactionManager**: Внутренний, для контейнера (CMT).
- **XAResource**: Для 2PC (координация ресурсов).

**Пример с JMS + JPA** (атомарно: сохрани + кинь сообщение):


```java
@Stateless
public class OrderService {
    @TransactionAttribute(TransactionAttributeType.REQUIRED)  // JTA управляет
    public void placeOrder(Order order) {
        em.persist(order);  // Шаг 1: В БД
        
        // Шаг 2: В очередь (JMS)
        TextMessage msg = sess.createTextMessage(order.getId());
        producer.send(msg);
        
        // JTA: Если JMS fail — откат БД. 2PC: обе ресурса commit или rollback
    }
}
```

- **В жизни**: Заказ сохранён в БД И отправлен в очередь для доставки — или ничего.

**Конфиг**: В persistence.xml (JTA-data-source) или standalone.xml (WildFly).

# 9. Веб-сервисы. Технологии JAX-RS и JAX-WS.

## Что такое веб-сервисы и зачем они

Веб-сервисы — это когда твоё приложение "разговаривает" с другими приложениями по сети, как API, но для серверов. Например, в онлайн-магазине ты шлёшь заказ в платёжный сервис (типа Stripe) — он проверяет карту и отвечает "OK" или "ошибка". Без этого всё вручную, с файлами или email.

В Jakarta EE (EE 11, 2025) два инструмента:

- **JAX-RS** — для REST: простой, как запросы в браузере (GET /products — список товаров в JSON).
- **JAX-WS** — для SOAP: строгий, как официальный договор (XML с подписью, для банков).

Оба позволяют создать "эндпоинт" (URL для вызова) и обрабатывать запросы. Разница: REST лёгкий и гибкий, SOAP — тяжёлый, но с гарантиями (контракт WSDL). В EE они интегрируются с CDI (инжект зависимостей) и контейнером (WildFly сам маппит URL).

## JAX-RS: Как создать REST API (просто и быстро)

JAX-RS — для современных API. REST — это не протокол, а стиль: используй HTTP-методы (GET для чтения, POST для создания), возвращай JSON, пути как /api/users/1. Клиент (мобилка или фронт) зовёт URL, ты отвечаешь данными.

**Шаги создания**:

1. Аннотируй класс @Path("/api/users") — базовый URL.
2. Добавь методы: @GET для списка, @POST для добавления.
3. Верни POJO — контейнер превратит в JSON (с Jackson или JSON-B).
4. Разверни в WAR — готово, тести в Postman.

**Пример из жизни**: API для пользователей в магазине. Клиент (app) GET /api/users/1 — получает профиль, POST /api/users — создаёт нового.

**Код (шаг за шагом)**:


```java
import jakarta.ws.rs.*;  // Импорты JAX-RS
import jakarta.inject.Inject;  // Для CDI
import jakarta.ws.rs.core.*;  // Response

@Path("/api/users")  // Шаг 1: Базовый путь — все запросы /api/users/*
public class UserApi {  // Твой класс
  
  @Inject  // Шаг 2: Инжект сервиса (твоя логика)
  private UserService service;  // UserService — твой класс с findAll(), save()
  
  @GET  // Шаг 3: GET /api/users — список всех
  public Response getAllUsers() {
    List<User> users = service.findAll();  // Получи из БД
    return Response.ok(users).build();  // Верни JSON: [{"id":1,"name":"Alice"}]
  }
  
  @GET
  @Path("/{id}")  // Шаг 4: GET /api/users/1 — один юзер (/{id} — параметр)
  public Response getUser(@PathParam("id") Long id) {  // @PathParam — извлечёт id из URL
    User user = service.findById(id);
    if (user == null) {
      return Response.status(404).build();  // Не нашёл — 404
    }
    return Response.ok(user).build();  // JSON: {"id":1,"name":"Alice"}
  }
  
  @POST  // Шаг 5: POST /api/users — создать (тело запроса JSON)
  @Consumes(MediaType.APPLICATION_JSON)  // Принимай JSON
  @Produces(MediaType.APPLICATION_JSON)  // Отвечай JSON
  public Response createUser(User newUser) {  // newUser — POJO, парсится из тела
    service.save(newUser);  // Сохрани
    return Response.status(201).entity(newUser).build();  // 201 Created + JSON
  }
}
```

- **User — POJO**: public class User { private Long id; private String name; // геттеры/сеттеры } — JSON-B сделает JSON.
- **Тести**: Запусти сервер, GET [http://localhost:8080/api/users](http://localhost:8080/api/users) — увидишь список. POST с JSON в Postman — создастся.

**Плюсы**: Легко, быстро, масштабируемо. Минусы: Нет встроенного контракта (документируй Swagger).

## JAX-WS: Как создать SOAP-сервис (для строгих случаев)

JAX-WS — для SOAP: сообщения в XML, с WSDL (авто-документ — "что я умею"). Тяжёлый (XML большой), но с гарантиями: security, ошибки в Fault.

**Шаги создания**:

1. Аннотируй класс @WebService — генерит WSDL.
2. Добавь методы @WebMethod.
3. Разверни — WSDL по /service?wsdl.
4. Клиент: Генерит stub из WSDL (wsimport), зовёт как локальный метод.

**Пример из жизни**: Сервис оплаты в банке. Клиент (магазин) зовёт processPayment — получает XML "OK".

**Код (шаг за шагом)**:


```java
import jakarta.jws.*;  // Импорты JAX-WS
import jakarta.inject.Inject;

@WebService  // Шаг 1: Это сервис — генерит WSDL
public class PaymentService {  // Разверни как endpoint
  
  @Inject private PaymentDao dao;  // Твоя логика (CDI)
  
  @WebMethod  // Шаг 2: Метод в контракте WSDL
  public String processPayment(@WebParam(name = "amount") double amount, 
                               @WebParam(name = "cardNumber") String card) {
    // Логика: проверь
    if (amount <= 0 || card.length() < 16) {
      throw new PaymentException("Invalid data");  // Fault — XML-ошибка
    }
    dao.charge(card, amount);  // Спиши с карты
    return "Payment successful for " + amount;  // XML-ответ
  }
  
  // Другой метод
  @WebMethod
  public double getBalance(@WebParam(name = "card") String card) {
    return dao.getBalance(card);  // Верни баланс
  }
}
```

- **WSDL**: Авто по [http://localhost:8080/payment?wsdl](http://localhost:8080/payment?wsdl) — XML с описанием методов.
- **Клиент (генерится)**: wsimport -keep [http://server/payment?wsdl](http://server/payment?wsdl) — создаст PaymentService.java. Вызов: PaymentService port = new PaymentServiceService().getPaymentServicePort(); String result = port.processPayment(100.0, "4111...");
- **Тести**: SOAP UI — загрузи WSDL, вызови метод, увидишь XML.

**Плюсы**: Контракт (WSDL — "что ожидать"), security built-in. Минусы: XML тяжёлый, сложнее код.

## JAX-RS vs JAX-WS: Когда что выбрать

- **JAX-RS**: Для новых API (мобилки, фронты) — быстро, JSON. 90% случаев.
- **JAX-WS**: Для старых систем (банки, где нужен SOAP) — контракт, надёжность.
- **Микс**: В одном app — REST для публичного, SOAP для internal.

**В EE 11**: JAX-RS 4.0 — async с Virtual Threads, JAX-WS 4.0 — проще с CDI.

# 10. Платформа Spring. Сходства и отличия с Java EE.

## Что такое Spring и EE (чтобы не путаться)

- **Spring** — это "набор инструментов" (фреймворк) для Java-приложений. Как конструктор Lego: берёшь модули (DI, веб, БД), собираешь app. Spring Boot — "умный стартер", запускает всё одной командой, без сервера. Создан для простоты, популярен в 2025 (миллионы проектов).
- **Jakarta EE** (ранее Java EE) — "правила игры" (спецификации), как ГОСТ: определяет, как делать DI, веб, tx. Реализации — серверы (WildFly), где код работает везде. Фокус на стандартах, для больших компаний.

## Сходства: Где они похожи (можно даже мигрировать)

Оба решают одни задачи enterprise: как связывать части app, работать с БД, делать API. Код часто похож — Spring "вдохновлён" EE.

**Ключевые сходства** (с примерами):

1. **DI (внедрение зависимостей)**: Оба инжектят сервисы автоматически. В Spring — @Autowired UserService repo; в EE — @Inject UserService repo. Аналогия: "Авто-доставка" — не пишешь new, фреймворк сам подставляет.
2. **Веб и API**: Оба для REST/MVC. Spring — @RestController с @GetMapping("/users"); EE — @Path("/users") с @GET. Результат: GET /users — JSON-список.
3. **БД (JPA)**: Оба используют Hibernate для @Entity User { @Id Long id; }. Сохраняешь em.persist(user).
4. **Транзакции**: Оба "всё или ничего" (@Transactional в Spring, @TransactionAttribute в EE).
5. **Messaging**: Spring @JmsListener для очередей, EE @MessageDriven — оба слушают JMS.

**Пример в жизни**: В магазине — сервис заказов инжектит репозиторий БД. Код почти идентичен, мигрируешь за день.

**Почему сходства?** Spring реализует многие EE-specs (e.g., JPA, JMS), так что разработчики знают оба.

## Отличия: Где они расходятся (чтобы выбрать)

Spring — гибкий "самоделкин", EE — жёсткие "правила". Spring проще для малого, EE — для большого (стандарты).

**Ключевые отличия** (таблица для ясности, с аналогиями):

|Аспект|Spring (Boot)|Jakarta EE|Аналогия / Когда выбрать|
|---|---|---|---|
|**Сборка app**|Модули как Lego: добавь starter-web — готово REST. Boot запускает embedded сервер (Tomcat внутри JAR).|Спецификации: пишешь по API, deploy в сервер (WildFly). Нет "всё сразу".|Spring — как IKEA (собери сам). EE — как фабрика (стандартно). Spring для прототипа, EE для команды.|
|**Конфиг**|Авто: Boot угадывает (YAML файл, convention over config). Меньше XML.|Аннотации + XML (web.xml, beans.xml). Explicit всё.|Spring — "волшебство" (быстро, но магия пугает). EE — "всё на виду" (контроль, но дольше). Spring для solo, EE для compliance.|
|**Производительность / Cloud**|Native compile (GraalVM), actuators для мониторинга. Идеал для Kubernetes (Spring Cloud).|Core Profile для native (Quarkus), но серверы тяжёлые.|Spring — спорткар (быстрый старт). EE — грузовик (надёжный, но медленнее). Spring для микросервисов, EE для монолитов.|
|**Экосистема / Обучение**|Огромная: Boot tutorials, Spring Initializr (генерит проект). 60% рынка в 2025.|Стандарты (TCK-тесты), но меньше туториалов. 20% рынка.|Spring — Netflix (кино для всех). EE — классика (для профи). Spring для новичков, EE для корпораций (банки).|
|**Лицензия / Поддержка**|Open (Apache), VMware. Бесплатно, но enterprise-версия платная.|Open (Eclipse), vendor-neutral. Бесплатно.|Spring — Apple (удобно, но экосистема закрытая). EE — Linux (открыто, стандарты). Spring для инноваций, EE для portability.|

**Пример в жизни**: Стартап — Spring Boot: 5 мин на API с БД. Корпорация (банк) — EE: код работает на любом сервере, compliance с GDPR.

**Миграция**: Легко с Spring 6 (поддержка Jakarta namespaces), но Spring не 100% EE (нет EJB).

## Итог

Сходства — основы enterprise (DI, JPA), код похож. Отличия — Spring проще/быстрее для малого (Boot магия), EE строже/портативнее для большого (стандарты). В 2025 выбирай Spring для 80% проектов, EE для legacy/стандартов. Нет "лучше" — зависит от команды.


# 11. Модули Spring. Архитектура Spring Runtime. Spring Security и Spring Data.

Модули — это "кусочки" Spring, которые ты подключаешь только нужные, чтобы app не раздувалась. Не как в EE, где "всё по стандарту", а как в конструкторе: взял Web для сайта, Data для БД — готово. В Boot — starters (готовые пакеты), тянешь одной строкой в pom.xml.

**Ключевые модули с примерами**:

- **Core (основа)**: Управляет объектами (DI — "сам подставь репозиторий"). Аналогия: Авто-пилот — не пишешь new Repo, Spring сам. Используй всегда. Пример: В магазине сервис заказов "знает" про БД без кода.
- **Web/MVC**: Для API и страниц (@RestController — GET /products возвращает список товаров). Аналогия: Дверь в дом — запрос пришёл, ответ ушёл. Пример: Мобилка зовёт /orders — JSON с заказами.
- **Data**: Для БД (JPA — сохрани User в MySQL). Аналогия: Ящик для инструментов — auto-CRUD (создай/найди/обнови). Пример: findByName("Alice") — список без SQL.
- **Security**: Для логинов/ролей (hasRole("ADMIN")). Аналогия: Замок с ключами — только админ видит /admin. Пример: В банке /balance — логинь, иначе 401.
- **Boot**: "Стартер" — auto-конфиг, embedded сервер. Аналогия: Микроволновка — положил, нажал, готово. Пример: mvn run — сайт на localhost.

**Как выбрать**: Для простого API — Web + Boot. Для БД — + Data. В pom.xml: spring-boot-starter-web — тянет Core + Tomcat.

**Пример в жизни**: Стартап делает app для доставки — Core для DI, Web для API, Data для заказов в БД. Всё в 3 starters, код — 100 строк.

## Архитектура Spring Runtime: Как "двигатель" запускает app

Runtime — это "мозг" Spring: IoC-контейнер (ApplicationContext), который создаёт объекты, связывает их (DI) и управляет жизнью (init/cleanup). В Boot — auto: run() — и контекст готов, сервер запущен.

**Простая аналогия**: Контекст — как дирижёр оркестра: сканирует код (@Component — "ты игрок"), подставляет инструменты (@Autowired), начинает концерт (@PostConstruct).

**Как работает шаг за шагом**:

1. **Запуск**: SpringApplication.run(App.class) — читает yml (конфиг: порт, БД).
2. **Сканирование**: Ищет @Component — создаёт бины (UserService, Repo).
3. **DI**: @Autowired — связывает (UserService знает Repo).
4. **Lifecycle**: @PostConstruct — "готов, загрузи данные"; @PreDestroy — "убирайся".
5. **Runtime**: Сервер (Tomcat) ловит запросы, контекст отдаёт бины.

**Пример в жизни**: App для магазина — run() — контекст создаёт OrderService, инжектит Repo, Tomcat ждёт /orders. Запрос — сервис отвечает JSON.

**Код минимальный** (main + бин):


```java
@SpringBootApplication  // "Включи сканирование и auto-config"
public class ShopApp {
    public static void main(String[] args) {
        SpringApplication.run(ShopApp.class, args);  // Runtime старт: контекст + сервер
    }
}

@Component  // "Я бин"
class OrderService {
    @Autowired  // "Подставь Repo"
    private OrderRepo repo;
    
    @PostConstruct  // "После создания — инициализируйся"
    public void start() {
        System.out.println("Магазин открыт!");  // Загрузи кэш
    }
}
```

- **Что видишь**: Run — "Магазин открыт!", localhost:8080/orders — работает.

В 6.2: Runtime с AOT — компилирует заранее, быстрее в cloud.

## Spring Security: Как защитить app (логин, роли)

Security — "охранник": проверяет, кто заходит (auth), что может (роли). В Boot — auto: добавь starter, и /login готов.

**Аналогия**: Дверь с кодовым замком — ввёл пароль (auth), показал пропуск (роль ADMIN).

**Как настроить шаг за шагом**:

1. Добавь starter-security — auto-логин (user/password из консоли).
2. Конфиг: SecurityFilterChain — .authorizeHttpRequests() для путей.
3. Роли: hasRole("USER") — только для юзеров.
4. Для прод: БД или OAuth (Google login).

**Пример в жизни**: В app банка — /balance только после логина, /admin — для босса.

**Код** (защита /users — логин, /admin — роль):


```java
@Configuration
@EnableWebSecurity  // "Включи охрану"
public class Guard {
    
    @Bean  // Конфиг цепочки фильтров
    public SecurityFilterChain chain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(req -> req
            .requestMatchers("/public").permitAll()  // Без пароля
            .requestMatchers("/users").authenticated()  // Логинь любой
            .requestMatchers("/admin").hasRole("ADMIN")  // Только админ
            .anyRequest().denyAll()  // Остальное — стоп
        )
        .formLogin()  // Форма /login
        .logout();  // /logout
        return http.build();
    }
    
    @Bean  // Пользователи (в memory для теста)
    public UserDetailsService users() {
        return new InMemoryUserDetailsManager(
            User.withDefaultPasswordEncoder()
                .username("user").password("pass").roles("USER").build(),
            User.withDefaultPasswordEncoder()
                .username("admin").password("pass").roles("ADMIN").build()
        );
    }
}
```

- **Тести**: /users — редирект на /login. Логинь user/pass — OK. /admin — 403 без роли.

Для OAuth: .oauth2Login() — логинь Google.

## Spring Data: Как работать с БД без боли

Data — "помощник" для БД: абстрагирует SQL, даёт готовые методы (findAll, save). JPA для реляционных (MySQL), Mongo для NoSQL.

**Аналогия**: Не пишешь SQL руками — как Google: "найди по имени", и готово.

**Как использовать шаг за шагом**:

1. Добавь starter-data-jpa + driver (H2 для теста).
2. @Entity User — модель.
3. Interface extends JpaRepository — auto-CRUD + кастом (findByName).
4. @Service зовёт repo.

**Пример в жизни**: В магазине — repo.findById(orderId) — заказ из БД.

**Код** (репо + сервис):

```java
@Entity  // "Это таблица в БД"
public class Order {
    @Id @GeneratedValue
    private Long id;
    private String item;
    // геттеры
}

public interface OrderRepo extends JpaRepository<Order, Long> {  // "Авто-магия"
    
    // Готовые: findAll(), save(order)
    
    List<Order> findByItem(String item);  // Авто-SQL: SELECT * FROM order WHERE item=?
    
    @Query("SELECT o FROM Order o WHERE o.id = :id")  // Кастом JPQL
    Order findByIdCustom(@Param("id") Long id);
}

@Service
public class OrderService {
    @Autowired private OrderRepo repo;  // Инжект
    
    public List<Order> getByItem(String item) {
        return repo.findByItem(item);  // Вызов — БД вернёт список
    }
}
```

- **Тести**: yml: spring.datasource.url=jdbc:h2:mem:test. /orders/item=book — список.

Для Mongo: spring-boot-starter-data-mongodb, extends MongoRepository.

## Итог

Модули — "выбери инструмент" (Core + Web для API). Runtime — "дирижёр" (run — и app живой). Security — "замок" (логин/роли за 10 строк). Data — "волшебник БД" (findByName без SQL). В Boot — минимум усилий, в 6.2 — супер для cloud.

# 12. Реализация IoC и CDI в Spring. Сходства и отличия с Java EE.

IoC (Inversion of Control, "инверсия контроля") — это идея, когда фреймворк сам создаёт и связывает твои объекты, а не ты вручную (new Repo()). CDI (Contexts and Dependency Injection) — спецификация EE для этого: управляет зависимостями и "жизнью" объектов (scopes, события).

В Spring IoC — сердце фреймворка (Core-модуль), CDI — не используется (Spring имеет свой DI). В EE CDI — стандарт (версия 4.0 в EE 11, 2025). Сходства: Оба решают "не пиши new". Отличия: Spring проще (магия Boot), EE строже (стандарты). В 2025 Spring 6.2 интегрирует Jakarta namespaces, так что код мигрирует легче.

**Аналогия**: IoC/CDI — как Uber: ты говоришь "куда", а приложение само едет (создаёт машину, связывает с водителем). Без — сам рулишь (new Driver()).

## IoC в Spring: Как это работает

Spring IoC — "контейнер" (ApplicationContext), который создаёт "бины" (твои классы), инжектит зависимости (@Autowired) и управляет ими. В Boot — auto: run() — и всё готово.

**Шаги на практике**:

1. Аннотируй класс @Component — "я бин, создай меня".
2. @Autowired — "подставь зависимость" (e.g., сервис знает репозиторий).
3. Контекст сканирует, создаёт, связывает.
4. Scopes: @Scope("singleton") — один экземпляр (default), prototype — новый каждый раз.

**Пример в жизни**: В магазине сервис заказов (@Service) знает про репозиторий (@Repository). Spring сам создаёт repo, подставляет в сервис — вызов service.save(order), и готово.

**Код** (простой сервис):

```java
@Component  // "Я бин, Spring создай"
public class OrderService {
    @Autowired  // "Подставь repo"
    private OrderRepo repo;  // OrderRepo — @Repository
    
    public void save(Order order) {
        repo.save(order);  // Spring связал, работает
    }
}

@SpringBootApplication  // Сканирует бины
public class App {
    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(App.class, args);  // IoC-контейнер готов
        OrderService service = context.getBean(OrderService.class);  // Возьми бин
        service.save(new Order());  // Всё связано
    }
}
```

- **Что происходит**: Run — Spring находит @Component, new OrderService, new OrderRepo, @Autowired — repo в service. Без IoC — new OrderRepo() вручную, тесная связь.

## CDI в Jakarta EE: Как это работает

CDI — стандарт EE для IoC: контейнер (Weld в WildFly) управляет "управляемыми бины" (@ApplicationScoped), инжектит (@Inject), scopes (@RequestScoped — на запрос).

**Шаги на практике**:

1. Аннотируй @ApplicationScoped — "управляй мной".
2. @Inject — "подставь зависимость".
3. Контейнер (при deploy) сканирует, создаёт, связывает.
4. Scopes: @Dependent — по запросу, @SessionScoped — на сессию.

**Пример в жизни**: Тот же магазин — сервис заказов (@ApplicationScoped) знает repo (@Repository). Контейнер сам связывает при deploy WAR.

**Код** (похожий):

java

```
@ApplicationScoped  // "Управляй мной"
public class OrderService {
    @Inject  // "Подставь repo"
    private OrderRepo repo;  // @Repository
  
    public void save(Order order) {
        repo.save(order);  // Связь готова
    }
}

// В EE — deploy WAR, контейнер (WildFly) запускает CDI
```

- **Что происходит**: Deploy — контейнер находит @ApplicationScoped, new OrderService, new OrderRepo, @Inject — repo в service. Без CDI — new вручную.

## Сходства: Где они похожи

Оба — IoC: фреймворк создаёт/связывает, ты не new. Код мигрирует (Spring поддерживает Jakarta @Inject).

**Простые сходства**:

- **DI**: @Autowired ≈ @Inject — подставь зависимость.
- **Бины**: @Component ≈ @ApplicationScoped — "создай меня".
- **Lifecycle**: @PostConstruct в Spring ≈ @PostConstruct в CDI — "инициализируйся после создания".
- **Scopes**: Singleton в Spring ≈ @ApplicationScoped в CDI — один на app.
- **Пример**: Сервис знает repo — в обоих 3 строки кода, работает одинаково.

**В жизни**: В магазине save(order) — Spring или EE сделают то же: repo.save().

## Отличия: Где Spring проще, EE строже

Spring — "умный помощник" (Boot угадывает), EE — "правила" (стандарт, контейнер управляет).

**Таблица отличий** (с примерами):

|Аспект|Spring IoC|CDI in EE|Пример / Когда выбрать|
|---|---|---|---|
|**Запуск**|Boot run() — auto-контекст.|Deploy WAR — контейнер (WildFly) запускает.|Spring — 1 команда для теста. EE — для сервера.|
|**Конфиг**|YAML, @Configuration — магия.|beans.xml — explicit (альтернативы, interceptors).|Spring — быстро. EE — контроль (для команды).|
|**Scopes**|@Scope("request") — гибко.|@RequestScoped — стандарт, прокси для доступа.|Spring — кастом. EE — portability (работает везде).|
|**События**|@EventListener — просто.|@Observes — CDI-события, async в 4.0.|Spring — для Boot. EE — для tx (JTA).|
|**Интеграция**|Boot starters — всё в одном.|Specs — мигрируй между серверами.|Spring — прототип. EE — enterprise.|


# 13. Реализация REST API в Java EE и Spring.

REST API — это архитектурный стиль, по которому приложения общаются по HTTP: клиент отправляет запрос (GET /api/users для списка пользователей), сервер возвращает данные в JSON. В Jakarta EE это реализуется через JAX-RS (стандартная спецификация версии 4.0 в EE 11, релиз июнь 2025), которая определяет аннотации для маршрутизации и обработки. В Spring — через Spring Web MVC (версия 6.2 в 2025), с аннотациями @RestController и @GetMapping, интегрированными с Boot для авто-конфигурации.

JAX-RS — часть EE, работает в контейнерах (WildFly, Payara), обеспечивает portability (код запускается на любом EE-сервере без изменений). Spring Web — фреймворк, требует Boot для простоты, но привязан к Spring-экосистеме. Оба возвращают JSON через библиотеки (JSON-B в EE, Jackson в Spring). В 2025 JAX-RS 4.0 добавляет поддержку Java Records для responses и async с Virtual Threads, Spring Web — AOT-компиляцию для native.

## Реализация в Jakarta EE (JAX-RS)

JAX-RS — спецификация для REST: аннотации определяют пути и методы, контейнер (e.g., Jersey) обрабатывает запросы. Требует Java 17+, deploy в WAR. Нет авто-конфигурации — настраиваешь Application-класс.

**Шаги реализации**:

1. Добавьте зависимость: jakarta.ws.rs-api:4.0 в pom.xml (provided scope).
2. Создайте Application-класс для регистрации ресурсов: @ApplicationPath("/api").
3. Определите ресурс: @Path для класса/метода, @GET/@POST для HTTP-методов.
4. Инжект зависимостей: @Inject из CDI.
5. Обработка JSON: @Produces/@Consumes с MediaType.APPLICATION_JSON, используйте POJO (JSON-B сериализует).
6. Deploy WAR в контейнер (WildFly: bin/jboss-cli --connect --command=deploy app.war).
7. Тестирование: curl или Postman (e.g., GET [http://localhost:8080/api/users](http://localhost:8080/api/users)).

**Код примера** (ресурс для пользователей, с CDI-инжектом):

```java
import jakarta.ws.rs.*;  // JAX-RS аннотации
import jakarta.ws.rs.core.*;  // Response
import jakarta.inject.Inject;  // CDI
import java.util.List;

@Path("/users")  // Базовый путь: /api/users (если ApplicationPath("/api"))
@Produces(MediaType.APPLICATION_JSON)  // Все ответы JSON
@Consumes(MediaType.APPLICATION_JSON)  // Вход JSON
public class UserResource {
    
    @Inject  // Инжект сервиса (CDI)
    private UserService service;  // UserService — @ApplicationScoped с логикой
    
    @GET  // GET /users — список всех
    public List<User> getAll() {
        return service.findAll();  // Service возвращает List<User>, JSON-B — JSON
    }
    
    @GET
    @Path("/{id}")  // GET /users/{id} — один пользователь
    public Response getById(@PathParam("id") Long id) {  // @PathParam извлекает id из URL
        User user = service.findById(id);
        if (user == null) {
            return Response.status(Response.Status.NOT_FOUND).build();  // 404
        }
        return Response.ok(user).build();  // 200 + JSON
    }
    
    @POST  // POST /users — создание
    public Response create(User input) {  // @Consumes парсит JSON в User (POJO)
        User saved = service.save(input);
        return Response.status(Response.Status.CREATED).entity(saved).build();  // 201 + JSON
    }
}

// Application-класс для регистрации (META-INF/services/jakarta.ws.rs.core.Application)
@ApplicationPath("/api")  // Базовый /api
public class RestApp extends Application {
    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> classes = new HashSet<>();
        classes.add(UserResource.class);  // Регистрируй ресурсы
        return classes;
    }
}

// User — POJO для JSON
public class User {
    private Long id;
    private String name;
    // Геттеры/сеттеры (JSON-B использует их для сериализации)
}
```

- **Факты**: @PathParam/@QueryParam для параметров. ExceptionMapper для ошибок (e.g., NotFoundException → 404). В EE 11 JAX-RS 4.0: @RegisterRestApplication для CDI-авто-регистрации.

**Тестирование**: Deploy, GET [http://localhost:8080/api/users/1](http://localhost:8080/api/users/1) — {"id":1,"name":"Alice"}. POST JSON {"name":"Bob"} — 201 с saved.

## Реализация в Spring (Web MVC)

Spring Web MVC — фреймворк для REST: @RestController определяет эндпоинты, Boot auto-конфигурует сервер (Tomcat) и Jackson для JSON. Требует Java 17+, запускается JAR.

**Шаги реализации**:

1. Добавьте spring-boot-starter-web в pom.xml.
2. @RestController для класса, @RequestMapping/@GetMapping для методов.
3. Инжект: @Autowired из Spring DI.
4. Обработка JSON: Авто через Jackson (POJO → JSON).
5. Запуск: mvn spring-boot:run.
6. Тестирование: curl или Postman.

**Код примера** (контроллер для пользователей, с Spring DI):


```java
import org.springframework.web.bind.annotation.*;  // Аннотации MVC
import org.springframework.http.*;  // ResponseEntity
import org.springframework.beans.factory.annotation.Autowired;  // DI
import java.util.List;

@RestController  // JSON по умолчанию
@RequestMapping("/api/users")  // Базовый путь
public class UserController {
    
    @Autowired  // Spring DI
    private UserService service;  // UserService — @Service с логикой
    
    @GetMapping  // GET /api/users — список
    public List<User> getAll() {
        return service.findAll();  // Jackson сериализует в JSON
    }
    
    @GetMapping("/{id}")  // GET /api/users/{id}
    public ResponseEntity<User> getById(@PathVariable Long id) {  // @PathVariable — id из URL
        User user = service.findById(id);
        if (user == null) {
            return ResponseEntity.notFound().build();  // 404
        }
        return ResponseEntity.ok(user);  // 200 + JSON
    }
    
    @PostMapping  // POST /api/users
    public ResponseEntity<User> create(@RequestBody User input) {  // @RequestBody — JSON в User
        User saved = service.save(input);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);  // 201 + JSON
    }
}

// User — POJO для JSON
public class User {
    private Long id;
    private String name;
    // Геттеры/сеттеры (Jackson использует их)
}

// Main для Boot
@SpringBootApplication
public class App {
    public static void main(String[] args) {
        SpringApplication.run(App.class, args);  // Авто-запуск
    }
}
```

- **Факты**: @RequestBody/@ResponseBody для JSON. ExceptionHandler для ошибок. В Spring 6.2: @RestControllerAdvice для global ошибок.

**Тестирование**: Run, GET [http://localhost:8080/api/users/1](http://localhost:8080/api/users/1) — {"id":1,"name":"Alice"}. POST JSON — 201.

## Сходства и отличия

**Сходства**:

- Аннотации для маршрутизации (@Path ≈ @RequestMapping, @GET ≈ @GetMapping).
- DI (@Inject ≈ @Autowired).
- JSON из POJO (MediaType.APPLICATION_JSON ≈ auto в Spring).
- Response для статусов (Response.status(404) ≈ ResponseEntity.notFound()).
- Факты: Оба основаны на HTTP, поддерживают async (CompletableFuture в 2025).

**Отличия**:

|Аспект|JAX-RS (EE)|Spring Web|
|---|---|---|
|**Конфигурация**|Application-класс для регистрации, beans.xml для CDI.|Boot auto (yml), @SpringBootApplication.|
|**JSON**|JSON-B (стандарт EE).|Jackson (настраиваемо).|
|**Ошибки**|ExceptionMapper.|@ExceptionHandler или @ControllerAdvice.|
|**Запуск**|Deploy WAR в контейнер.|mvn run (embedded).|
|**Факты**|Portability (TCK-тесты).|Гибкость (interceptors).|

**Итог**: JAX-RS — стандартный (мигрируй между серверами), Spring Web — удобный (auto в Boot). Код похож, различия в конфиге/запуске. В 2025 оба с Virtual Threads для async.

# 14. React JS. Архитектура и основные принципы разработки приложений.




# 15. Компоненты React. State & props. "Умные" и "глупые" компоненты.

### 1. Компоненты React

**Основная идея:** React построен на **компонентах** – независимых, самодостаточных частях UI. Они являются строительными блоками любого React-приложения.

- **Что такое компонент?**
    
    - Функция или класс JavaScript, который возвращает React-элементы (обычно в виде JSX).
        
    - Представляет собой часть пользовательского интерфейса.
        
    - Может иметь свое собственное состояние и принимать свойства.
        
- **Виды компонентов:**
    
    - **Функциональные компоненты (Functional Components):**
        
        - Определяются как обычные JS-функции.
            
        - Используют хуки (useState, useEffect и т.д.) для управления состоянием и побочными эффектами.
            
        - Современный и предпочтительный способ создания компонентов.
            
        
    
        
        ```jsx
        function WelcomeMessage(props) {
          return <h1>Привет, {props.name}!</h1>;
        }
        ```
        
    - **Классовые компоненты (Class Components):**
        
        - Определяются как классы ES6, наследующие от React.Component.
            
        - Имеют свой собственный state и методы жизненного цикла.
            
        - Более старый подход, встречается в легаси-коде.
            
        

        
        ```jsx
        class WelcomeMessage extends React.Component {
          render() {
            return <h1>Привет, {this.props.name}!</h1>;
          }
        }
        ```
        
- **JSX:** Часто используется для описания структуры компонента, делая код более читаемым.
    

---

### 2. State (Состояние)

**State** – это данные, которыми **управляет сам компонент**. Они могут меняться со временем, и при изменении state React автоматически обновляет UI.

- **Назначение:** Хранение динамических данных, которые влияют на рендеринг компонента.
    
- **Изменение state:**
    
    - **Функциональные компоненты:** Используется хук useState.
        
        
        ```jsx
        import React, { useState } from 'react';
        
        function Counter() {
          const [count, setCount] = useState(0); // count - текущее значение, setCount - функция для его изменения
        
          return (
            <div>
              <p>Счетчик: {count}</p>
              <button onClick={() => setCount(count + 1)}>Увеличить</button>
            </div>
          );
        }
        ```
        
    - **Классовые компоненты:** Используется this.state и метод this.setState().
        
        
        ```jsx
        class Counter extends React.Component {
          constructor(props) {
            super(props);
            this.state = { count: 0 };
          }
        
          render() {
            return (
              <div>
                <p>Счетчик: {this.state.count}</p>
                <button onClick={() => this.setState({ count: this.state.count + 1 })}>Увеличить</button>
              </div>
            );
          }
        }
        ```
        
- **Правила:**
    
    - state должен быть иммутабельным (неизменяемым). Всегда создавайте новый объект/массив при обновлении, а не модифицируйте существующий.
        
    - Изменение state должно происходить только через специальные функции (setCount, this.setState).
        

---

### 3. Props (Свойства)

**Props** – это данные, которые **передаются в компонент извне** (от родительского компонента). Они позволяют компонентам быть настраиваемыми и повторно используемыми.

- **Назначение:** Передача данных от родителя к потомку. Настройка внешнего вида и поведения дочернего компонента.
    
- **Передача Props:**
    
    ```jsx
    // Родительский компонент
    function App() {
      return <Greeting name="Alice" age={30} />;
    }
    
    // Дочерний компонент
    function Greeting(props) { // props - это объект, содержащий все переданные свойства
      return (
        <p>Привет, {props.name}! Тебе {props.age} лет.</p>
      );
    }
    ```
    
- **Правила:**
    
    - **Read-only:** Компонент не должен изменять props. Они предназначены только для чтения. Если нужно изменить значение, которое пришло через props, нужно управлять им в state родительского компонента и передавать новое значение обратно (или через колбэк-функции).
        
    - **Типы Props:** Могут быть любого типа данных: строки, числа, булевы значения, объекты, массивы, функции, другие React-элементы.
        

---

### 4. "Умные" и "Глупые" Компоненты (Container/Presentational Components)

Это паттерн проектирования, предложенный Стивом Смитом (Dan Abramov), который помогает лучше структурировать React-приложения, разделяя логику данных и представление.

#### 4.1. "Глупые" Компоненты (Presentational Components)

- **Что это:** Компоненты, которые отвечают **только за отображение UI**.
    
- **Характеристики:**
    
    - Не имеют собственного state (или имеют минимальный state для UI-элементов, например, состояние "hover" кнопки).
        
    - Получают все необходимые данные через props.
        
    - Используют props для отображения информации.
        
    - Могут передавать колбэк-функции (полученные через props) для обработки событий (например, onClick={props.onButtonClick}).
        
    - Легко переиспользуются.
        
    - Часто являются функциональными компонентами.
        
- **Пример:** Компонент Button, UserProfileInfo, ProductCard (отображает данные, но не управляет ими).
    

#### 4.2. "Умные" Компоненты (Container Components)

- **Что это:** Компоненты, которые отвечают за **логику приложения, управление данными и state**.
    
- **Характеристики:**
    
    - Имеют state.
        
    - Загружают данные (например, через API).
        
    - Управляют state и передают данные вниз к "глупым" компонентам через props.
        
    - Могут содержать колбэк-функции, которые потом передают в "глупые" компоненты для обработки событий.
        
    - Часто не имеют собственного HTML-разметки (или имеют минимальную, оберточную).
        
    - Обычно находятся выше в иерархии компонентов.
        
- **Пример:** Компонент, который загружает список пользователей с сервера и передает этот список в "глупый" компонент UserList, а также обрабатывает события клика на пользователя, передавая ID в колбэк-функцию.
    

#### **Преимущества паттерна Container/Presentational:**

- **Разделение ответственности:** Четко разделяет логику данных и представление, делая код более чистым и поддерживаемым.
    
- **Переиспользование:** "Глупые" компоненты можно легко использовать в разных "умных" компонентах.
    
- **Тестируемость:** "Умные" компоненты легко тестировать, имитируя их state и props. "Глупые" компоненты легко тестировать, проверяя, как они рендерят данные из props.
    
- **Улучшенная структура:** Приложение становится более организованным.
    

**Важное замечание:** С появлением хуков (особенно useState, useEffect, useContext), граница между "умными" и "глупыми" компонентами может стать менее явной. "Глупые" компоненты теперь могут использовать хуки для своего внутреннего UI-состояния, но основная идея разделения ответственности остается актуальной. Компоненты, которые управляют загрузкой данных и бизнес-логикой, по-прежнему можно считать "умными".

---

# 16. Разметка страниц в React-приложениях. JSX.

### 1. Разметка Страниц в React-приложениях

В React разметка страниц организуется с помощью **компонентного подхода**. Вместо того, чтобы писать один большой HTML-файл, UI разбивается на иерархию компонентов.

- **Основной принцип:** Каждый компонент отвечает за свою часть UI. Родительские компоненты рендерят дочерние, создавая сложную структуру страницы.
    
- **Root Element:** Обычно все React-приложение монтируется в один HTML-элемент в вашем public/index.html (часто это <div id="root"></div>)
    
    ```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>React App</title>
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root"></div> {/* React будет рендерить здесь */}
      </body>
    </html>
    ```
    
- **Роутинг (Routing):** Для одностраничных приложений (SPA) используется библиотека (например, **React Router**), которая позволяет динамически менять отображаемые компоненты в зависимости от URL в адресной строке браузера, создавая ощущение навигации между страницами.
    

---

### 2. JSX (JavaScript XML)

**JSX** – это синтаксическое расширение JavaScript, которое позволяет писать HTML-подобную разметку непосредственно в JavaScript-коде.

- **Что это:** Не является HTML, а скорее "синтаксическим сахаром" для создания React-элементов.
    
- **Зачем:**
    
    - **Читаемость:** Делает код, описывающий UI, более интуитивным и понятным.
        
    - **Удобство:** Позволяет сочетать логику JavaScript и разметку UI в одном месте.
        
    - **Безопасность:** JSX автоматически экранирует данные, предотвращая XSS-атаки (когда злоумышленник пытается внедрить вредоносный код через пользовательский ввод).
        
- **Как это работает:**
    
    - JSX-код **не выполняется напрямую** в браузере.
        
    - Он обрабатывается **транспилятором** (например, Babel), который преобразует JSX в обычные вызовы функций React.createElement().
        
    - React.createElement() затем создает React-элементы, которые React использует для построения Virtual DOM и обновления реального DOM.
        
- **Синтаксис:**
    
    - **HTML-подобная структура:** Выглядит как HTML.
        
        
        ```jsx
        const element = (
          <div>
            <h1>Заголовок</h1>
            <p>Параграф</p>
          </div>
        );
        ```
        
    - **JavaScript-выражения внутри JSX:** Любое допустимое JavaScript-выражение можно вставить в JSX, заключив его в фигурные скобки {}.
        
        
        ```jsx
        const name = "Alice";
        const year = new Date().getFullYear();
        
        const greeting = (
          <div>
            <h2>Привет, {name}!</h2> {/* Вставка переменной */}
            <p>Сегодня {year} год.</p>
            <p>Сумма: {10 + 5}</p> {/* Вставка выражения */}
          </div>
        );
        ```
        
    - **Атрибуты:** JSX-атрибуты часто похожи на HTML-атрибуты, но некоторые имеют другие имена (например, className вместо class, htmlFor вместо for).
        
        - class → className (потому что class – зарезервированное слово в JS)
            
        - for → htmlFor (тоже из-за конфликта имен)
            
        - Можно передавать JS-переменные, объекты, функции как значения атрибутов.
            
        
     
        ```jsx
        const imageUrl = 'path/to/image.jpg';
        const isActive = true;
        
        const imageElement = (
          <img src={imageUrl} alt="Пример изображения" />
        );
        
        const buttonElement = (
          <button disabled={!isActive}> {/* Атрибут disabled зависит от переменной */}
            Нажми меня
          </button>
        );
        ```
        
    - **Стили:** Стили можно передавать либо через className (ссылаясь на CSS-классы), либо через объект style.
        
        codeJsx
        
        ```
        // Через className
        <div className="my-class">Текст</div>
        
        // Через объект style (ключи camelCase, значения – строки)
        const elementStyle = {
          backgroundColor: 'lightblue',
          padding: '10px',
          fontSize: '16px' // px добавляется как строка
        };
        <div style={elementStyle}>Текст со стилями</div>
        ```
        
    - **Условный рендеринг:** Используйте тернарный оператор или логический оператор &&.
        
        
        ```jsx
        const isLoggedIn = true;
        const message = "Добро пожаловать!";
        
        return (
          <div>
            {isLoggedIn ? ( // Тернарный оператор
              <h2>{message}</h2>
            ) : (
              <h2>Пожалуйста, войдите.</h2>
            )}
        
            {isLoggedIn && <p>Вы вошли!</p>} {/* Логический && */}
          </div>
        );
        ```
        
    - **Списки:** Для рендеринга списков используйте метод .map() массива. Каждый элемент списка должен иметь уникальный атрибут key.
        
        codeJsx
        
        ```
        const items = ['Яблоко', 'Банан', 'Апельсин'];
        
        return (
          <ul>
            {items.map((item, index) => ( // index часто используется как key, но лучше уникальный ID, если есть
              <li key={index}>{item}</li>
            ))}
          </ul>
        );
        ```
        
        **key:** Атрибут key помогает React эффективно обновлять списки, идентифицируя каждый элемент. Он должен быть уникальным в пределах списка.
        

---

### Заключение

JSX – это мощный инструмент, который делает написание UI-разметки в React гораздо более удобным и безопасным. Он позволяет бесшовно встраивать JavaScript-логику в структуру UI, что является одной из ключевых особенностей React. Понимание его синтаксиса и правил является фундаментальным для работы с React.

# 17. Навигация в React-приложениях. ReactRouter.

### 1. Навигация в React-приложениях

В контексте React-приложений, особенно одностраничных (SPA), навигация означает управление отображением различных частей UI без полной перезагрузки страницы. Пользователь видит смену "страниц", но на самом деле React динамически меняет компоненты.

- **Вызовы:**
    
    - **Одностраничные приложения (SPA):** Вся страница загружается один раз, а дальнейшая "навигация" происходит за счет манипуляций с DOM силами JavaScript.
        
    - **Многостраничные приложения (MPA):** Каждый переход пользователя на новую "страницу" инициирует запрос к серверу, и сервер отправляет новый HTML-документ.
        

React чаще всего используется для SPA.

---

### 2. React Router

**React Router** – это самая популярная библиотека для реализации навигации в React-приложениях. Она предоставляет компоненты для управления маршрутами (URL-адресами) и отображения соответствующих компонентов.

- **Основная цель:** Синхронизация UI с URL в адресной строке браузера.
    

---

### 3. Основные Компоненты React Router (v6+)

React Router v6 имеет несколько ключевых компонентов:

#### 3.1. BrowserRouter

- **Что это:** Компонент, который использует HTML5 History API (pushState, replaceState, popstate) для синхронизации UI с URL. Это самый распространенный тип роутера для веб-приложений.
    
- **Где использовать:** Оборачивает все ваше приложение, чтобы обеспечить доступ к функциям роутинга.
    

    ```jsx
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import { BrowserRouter } from 'react-router-dom';
    import App from './App';
    
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <BrowserRouter> {/* Оборачиваем приложение в BrowserRouter */}
        <App />
      </BrowserRouter>
    );
    ```
    

#### 3.2. Routes

- **Что это:** Контейнер для определения всех возможных маршрутов в вашем приложении. Он ищет первое совпадение с текущим URL и рендерит соответствующий Route.
    
- **Использование:** Все компоненты \<Route\> должны быть внутри \<Routes\>.

    
    ```jsx
    import { Routes, Route } from 'react-router-dom';
    import HomePage from './pages/HomePage';
    import AboutPage from './pages/AboutPage';
    import NotFoundPage from './pages/NotFoundPage';
    
    function AppRoutes() {
      return (
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Главная страница */}
          <Route path="/about" element={<AboutPage />} /> {/* Страница "О нас" */}
          <Route path="*" element={<NotFoundPage />} /> {/* Обработка несуществующих маршрутов */}
        </Routes>
      );
    }
    ```
    

#### 3.3. Route

- **Что это:** Компонент, который определяет отдельный маршрут. Он принимает два основных пропса:
    
    - path: Строка, определяющая URL, который будет соответствовать этому маршруту (например, /, /about, /users/:userId).
        
    - element: React-компонент, который будет отрисован, если path совпадет с текущим URL.
        
- **Спец. пути:**
    
    - /: Главный путь.
        
    - \*: Путь, который соответствует чему угодно (используется для страницы 404 "Not Found").
        

#### 3.4. Link (и NavLink)

- **Что это:** Компонент, который используется для создания ссылок между маршрутами. Вместо обычного \<a\> тега, Link предотвращает полную перезагрузку страницы.
    
- **NavLink:** Специальная версия Link, которая знает, когда она "активна" (то есть, когда ее to совпадает с текущим URL). Это полезно для стилизации активных ссылок в навигационном меню.
    
- **Пример:**
    
    
    ```jsx
    import { Link, NavLink } from 'react-router-dom';
    
    function Navigation() {
      return (
        <nav>
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
              >
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? 'active-link' : 'inactive-link')}
              >
                О нас
              </NavLink>
            </li>
            <li>
              <Link to="/contact">Контакты</Link> {/* Простая ссылка */}
            </li>
          </ul>
        \</nav\>
      );
    }
    ```
    

#### 3.5. Хуки для Навигации

React Router предоставляет хуки для работы с навигацией внутри компонентов:

- **useNavigate:**
    
    - **Что это:** Возвращает функцию, которую можно использовать для программного перехода по маршрутам (например, после успешной отправки формы).
        
    - **Пример:**
        
    
        ```jsx
        import { useNavigate } from 'react-router-dom';
        
        function LoginForm() {
          const navigate = useNavigate(); // Получаем функцию навигации
        
          const handleSubmit = (event) => {
            event.preventDefault();
            // ... логика авторизации ...
            if (true) { // Если авторизация успешна
              navigate('/dashboard'); // Переход на страницу dashboard
            }
          };
        
          return <form onSubmit={handleSubmit}>...</form>;
        }
        ```
        
- **useParams:**
    
    - **Что это:** Возвращает объект, содержащий пары ключ/значение из динамических сегментов URL (например, :userId).
        
    - **Пример:** Для пути /users/:userId, useParams() вернет { userId: '123' } если URL /users/123.
        
    
        
        ```jsx
        import { useParams } from 'react-router-dom';
        
        function UserProfile() {
          const { userId } = useParams(); // Получаем userId из URL
        
          // ... используем userId для загрузки данных пользователя ...
        
          return <h1>Профиль пользователя ID: {userId}</h1>;
        }
        ```
        
- **useLocation:**
    
    - **Что это:** Возвращает объект, представляющий текущий URL (pathname, search, hash).
        
    - **Пример:** Полезно для анализа URL или для отображения информации на основе параметров запроса.
        

---

### 4. Пример Структуры с React Router


```jsx
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation'; // Ваш компонент с Link/NavLink
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import UserProfile from './pages/UserProfile'; // Компонент, использующий useParams
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div>
      <Navigation /> {/* Навигация всегда видна */}
      <main> {/* Основной контент */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/users/:userId" element={<UserProfile />} /> {/* Динамический маршрут */}
          <Route path="*" element={<NotFoundPage />} /> {/* Страница 404 */}
        </Routes>
      </main>
    </div>
  );
}

export default App;

// src/components/Navigation.js (пример)
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <NavLink to="/">Главная</NavLink> | <NavLink to="/about">О нас</NavLink>
    </nav>
  );
}
export default Navigation;

// src/pages/HomePage.js
import React from 'react';

function HomePage() {
  return <h1>Добро пожаловать на главную страницу!</h1>;
}
export default HomePage;

// src/pages/AboutPage.js
import React from 'react';

function AboutPage() {
  return <h1>Страница "О нас"</h1>;
}
export default AboutPage;

// src/pages/UserProfile.js
import React from 'react';
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { userId } = useParams();
  return <h1>Профиль пользователя: {userId}</h1>;
}
export default UserProfile;

// src/pages/NotFoundPage.js
import React from 'react';

function NotFoundPage() {
  return <h1>404 - Страница не найдена</h1>;
}
export default NotFoundPage;
```

---

### Заключение

React Router – это неотъемлемый инструмент для создания навигации в React-приложениях. Он позволяет управлять URL-адресами и соответствующими компонентами, обеспечивая плавный пользовательский опыт в SPA. Понимание его основных компонентов (BrowserRouter, Routes, Route, Link, NavLink) и хуков (useNavigate, useParams, useLocation) является ключевым для построения интерактивных веб-приложений на React.

# 18. Управление состоянием интерфейса. Redux.

### 1. Управление Состоянием Интерфейса

В React приложениях управление состоянием (данными, которые меняются и влияют на UI) является центральной задачей.

- **Локальное состояние компонента (Component State):**
    
    - Управляется самим компонентом с помощью useState (в функциональных) или this.state (в классовых).
        
    - Идеально подходит для данных, которые используются только внутри одного компонента или передаются непосредственно потомкам.
        
- **Общий стейт (Shared State) / Глобальное состояние (Global State):**
    
    - Возникает, когда одни и те же данные нужны в разных, несвязанных напрямую компонентах (например, данные пользователя, состояние корзины покупок, тема оформления).
        
    - **Проблемы:**
        
        - **"Props Drilling":** Передача данных через несколько уровней вложенных компонентов, которые сами не используют эти данные.
            
        - **Сложность синхронизации:** Поддержание консистентности данных между разными компонентами становится трудным.
            
- **Решения для управления общим стейтом:**
    
    - **Context API (встроенный в React):** Позволяет передавать данные через дерево компонентов, минуя промежуточные компоненты. Хорошо подходит для относительно статичных данных (например, тема, язык).
        
    - **Библиотеки управления состоянием:** Специализированные решения для более сложных сценариев, предлагающие предсказуемое управление состоянием. **Redux** – одна из самых известных.
        

---

### 2. Redux

**Redux** – это предсказуемый контейнер для управления состоянием JavaScript-приложений. Он популярен для React-приложений, но может использоваться и с другими фреймворками.

- **Основные Принципы Redux (три принципа):**
    
    1. **Единый источник истины (Single Source of Truth):**
        
        - Все состояние приложения хранится в одном большом объекте – **Store**.
            
        - Один store управляет всем состоянием.
            
    2. **Состояние только для чтения (State is Read-Only):**
        
        - Единственный способ изменить состояние – это **отправить (dispatch) an Action**.
            
        - Action – это простой JavaScript-объект, описывающий, что произошло. Он должен иметь поле type.
            
    3. **Изменения производятся через чистые функции (Changes are Made with Pure Functions):**
        
        - Чтобы определить, как состояние изменяется в ответ на Actions, используются **Reducers**.
            
        - **Reducer:** Чистая функция, которая принимает предыдущее состояние и Action, и возвращает новое состояние. Редьюсеры не должны вызывать побочные эффекты (например, делать HTTP-запросы, изменять глобальные переменные).
            

---

### 3. Основные Концепции Redux

#### 3.1. Store (Хранилище)

- **Что это:** Объект, который хранит состояние всего приложения.
    
- **Функции:**
    
    - Содержит текущее состояние приложения.
        
    - Позволяет получать состояние (store.getState()).
        
    - Позволяет обновлять состояние (store.dispatch(action)).
        
    - Позволяет регистрировать слушателей (store.subscribe(listener)) для уведомления об изменениях состояния.
        
- **Создание:** Обычно создается один Store для всего приложения.
    

#### 3.2. Actions (Действия)

- **Что это:** Простые JavaScript-объекты, описывающие произошедшее событие.
    
- **Структура:** Должны иметь обязательное поле type (строка, часто в формате UPPER_SNAKE_CASE). Могут содержать дополнительные поля с данными.
    
    
    ```javascript
    // Пример Action
    {
      type: 'INCREMENT_COUNTER',
      payload: { // payload - часто используемое имя для данных
        amount: 1
      }
    }
    
    {
      type: 'SET_USER_NAME',
      payload: {
        name: 'Alice'
      }
    }
    ```
    
- **Action Creators:** Функции, которые создают и возвращают Actions. Упрощают создание Actions.
    
    
    ```javascript
    function incrementCounter(amount) {
      return {
        type: 'INCREMENT_COUNTER',
        payload: { amount }
      };
    }
    
    function setUserName(name) {
      return {
        type: 'SET_USER_NAME',
        payload: { name }
      };
    }
    ```
    

#### 3.3. Reducers (Редьюсеры)

- **Что это:** Чистые функции, которые определяют, как состояние приложения изменяется в ответ на Actions.
    
- **Сигнатура:** (previousState, action) => newState
    
- **Принцип работы:**
    
    - Редьюсер получает текущее состояние и Action.
        
    - Он смотрит на action.type.
        
    - В зависимости от типа Action, он возвращает новое состояние.
        
    - Если Action не соответствует ни одному известному типу, редьюсер должен вернуть текущее состояние без изменений.
        
    - **Не должен мутировать (изменять) предыдущее состояние.** Всегда возвращайте новый объект состояния.
        
    
    
    ```javascript
    // Пример Reducer
    const initialState = { count: 0, userName: '' };
    
    function rootReducer(state = initialState, action) {
      switch (action.type) {
        case 'INCREMENT_COUNTER':
          // Возвращаем НОВЫЙ объект состояния
          return {
            ...state, // Копируем предыдущее состояние
            count: state.count + action.payload.amount
          };
        case 'SET_USER_NAME':
          return {
            ...state,
            userName: action.payload.name
          };
        default:
          return state; // Важно вернуть текущее состояние, если Action не известен
      }
    }
    ```
    
- **Комбинирование Reducers:** В больших приложениях часто создают несколько редьюсеров (для разных частей состояния) и объединяют их в один главный с помощью combineReducers из Redux.
    

---

### 4. Redux в React-приложениях (React-Redux)

react-redux – это официальный набор связующих компонентов, который позволяет компонентам React взаимодействовать со Store Redux.

- **Основные компоненты/хуки:**
    
    - **\<Provider\>:**
        
        - Компонент, который оборачивает корневой компонент вашего приложения.
            
        - Он делает Store Redux доступным для всех дочерних компонентов.
            

        
        ```jsx
        // src/index.js
        import { Provider } from 'react-redux';
        import store from './store'; // Ваш созданный Store
        
        ReactDOM.render(
          <Provider store={store}>
            <App />
          </Provider>,
          document.getElementById('root')
        );
        ```
        
    - **useSelector (хук):**
        
        - Позволяет извлекать данные из Store.
            
        - Принимает функцию-селектор, которая получает полный state и возвращает нужную часть.
            
        - Компонент перерисовывается, когда извлекаемые данные меняются.
            
    
        
        ```jsx
        import { useSelector } from 'react-redux';
        
        function CounterDisplay() {
          const count = useSelector(state => state.counter.count); // Получаем count из state.counter
          return <p>Счетчик: {count}</p>;
        }
        ```
        
    - **useDispatch (хук):**
        
        - Возвращает функцию dispatch, которую можно использовать для отправки Actions в Store.
            
        
        
        ```jsx
        import { useDispatch } from 'react-redux';
        import { incrementCounter } from './actions'; // Ваш Action Creator
        
        function CounterButtons() {
          const dispatch = useDispatch(); // Получаем функцию dispatch
        
          return (
            <button onClick={() => dispatch(incrementCounter(1))}>
              Увеличить
            </button>
          );
        }
        ```
        

---

### 5. Redux Toolkit (RTK)

**Redux Toolkit (RTK)** – это официальный, opinionated (имеющий определенный взгляд на вещи) набор инструментов для Redux, который упрощает разработку и решает многие проблемы, присущие "чистому" Redux.

- **Ключевые преимущества RTK:**
    
    - **configureStore:** Простая настройка Store с автоматическим добавлением Redux Thunk (для асинхронных операций) и Redux DevTools.
        
    - **createSlice:** Самая важная функция. Позволяет создавать reducer'ы и action creators вместе, уменьшая бойлерплейт.
        
    - **"Immmer" встроен:** Позволяет писать "мутирующие" синтаксисом код в редьюсерах, который RTK безопасно преобразует в иммутабельные обновления.
        
    - **createAsyncThunk:** Упрощает обработку асинхронных операций (например, запросов к API).
        
- **Пример с RTK (createSlice):**
    
    
    ```javascript
    // src/features/counter/counterSlice.js
    import { createSlice } from '@reduxjs/toolkit';
    
    const initialState = { count: 0 };
    
    export const counterSlice = createSlice({
      name: 'counter', // Имя среза (slice)
      initialState,
      reducers: { // Определяем reducer'ы и соответствующие им action creators
        increment: (state) => { // state здесь можно мутировать
          state.count += 1;
        },
        decrement: (state) => {
          state.count -= 1;
        },
        incrementByAmount: (state, action) => {
          state.count += action.payload;
        },
      },
    });
    
    // Экспортируем action creators
    export const { increment, decrement, incrementByAmount } = counterSlice.actions;
    
    // Экспортируем reducer
    export default counterSlice.reducer;
    
    // src/store.js (пример создания Store с RTK)
    import { configureStore } from '@reduxjs/toolkit';
    import counterReducer from './features/counter/counterSlice';
    
    export const store = configureStore({
      reducer: { // Объединяем редьюсеры
        counter: counterReducer,
        // ... другие редьюсеры
      },
    });
    
    // src/features/counter/Counter.js (компонент)
    import React from 'react';
    import { useSelector, useDispatch } from 'react-redux';
    import { increment, decrement, incrementByAmount } from './counterSlice';
    
    function Counter() {
      const count = useSelector((state) => state.counter.count);
      const dispatch = useDispatch();
    
      return (
        <div>
          <p>Count: {count}</p>
          <button onClick={() => dispatch(increment())}>Increment</button>
          <button onClick={() => dispatch(decrement())}>Decrement</button>
          <button onClick={() => dispatch(incrementByAmount(5))}>Increment by 5</button>
        </div>
      );
    }
    export default Counter;
    ```
    

---

### 6. Когда использовать Redux?

- Когда состояние становится сложным и его трудно управлять локально или через Context API.
    
- Когда есть много компонентов, которым нужен доступ к одним и тем же данным.
    
- Когда требуется предсказуемый поток данных и возможность легко отлаживать изменения состояния (благодаря Redux DevTools).
    
- Для больших, сложных приложений, где важна структура и масштабируемость.
    

**Альтернативы:** Zustand, Jotai, Recoil – могут быть проще для небольших и средних проектов.

# 19. Angular: архитектура и основные принципы разработки приложений.

**Angular** – это комплексный фреймворк для создания масштабируемых и поддерживаемых веб-приложений, разработанный Google. Он использует **TypeScript** как основной язык программирования, что дает множество преимуществ, особенно для новичков. Angular предоставляет готовую структуру и набор инструментов для разработки, от UI до управления состоянием и роутинга.

---

### 1. Архитектура Angular: Модульность и Компонентный Подход

Angular – это **фреймворк**, то есть он задает структуру и правила для вашей разработки.

- **Модули (NgModule):**
    
    - Представьте модуль как "папку" или "блок", который объединяет связанные части вашего приложения.
        
    - Каждое Angular-приложение начинается с **корневого модуля** (AppModule).
        
    - Модули помогают организовать код, управлять зависимостями и позволяют **лениво загружать (lazy loading)** части приложения, что ускоряет начальную загрузку.
        
    - **Для новичка:** Пока что думайте о AppModule как о главном месте, где регистрируются все основные компоненты вашего приложения.
        
- **Компоненты (Component):**
    
    - Это **строительные блоки вашего пользовательского интерфейса (UI)**. Каждый компонент отвечает за часть страницы.
        
    - **Что входит в компонент:**
        
        1. **Класс TypeScript (.ts):** Здесь находится вся "логика" компонента – данные (свойства), методы (функции), которые управляют этими данными или реагируют на действия пользователя. **Это главная часть, где используется TypeScript.**
            
        2. **HTML-шаблон (.html):** Это разметка, которая будет отображаться на экране. Вы можете использовать внутри специальные конструкции Angular для вывода данных и реакции на события.
            
        3. **CSS-стили (.css / .scss):** Описывают внешний вид компонента. Angular обеспечивает **изоляцию стилей**, чтобы стили одного компонента не влияли на другие.
            
    - **Декоратор @Component:** Специальная "метка" для TypeScript-класса, которая говорит Angular: "Это компонент!". Он указывает на шаблон, стили и уникальный селектор (как HTML-тег) для этого компонента.
        
- **Директивы (Directive):**
    
    - Это "инструкции" для DOM. Они добавляют поведение или изменяют внешний вид HTML-элементов.
        
    - **Для новичка:** Компоненты – это тоже вид директив, но с шаблоном. Вы также встретите директивы, которые управляют структурой (например, *ngIf – показать/скрыть элемент, *ngFor – повторить элемент много раз) или стилями ([ngStyle], [ngClass]).
        
- **Сервисы (Service) и Dependency Injection (DI):**
    
    - **Сервисы:** Классы TypeScript, которые содержат общую логику: запросы к API, работу с данными, бизнес-логику. Они не привязаны к конкретному UI-элементу.
        
    - **Dependency Injection (DI):** Это очень важный принцип Angular. Вместо того, чтобы компонент сам создавал себе сервисы (например, const myService = new MyService();), Angular **"внедряет"** нужный сервис в компонент автоматически. Это делает код более организованным, тестируемым и переиспользуемым.
        
        
- **Пайпы (Pipe):**
    
    - Удобный способ форматировать данные прямо в шаблоне HTML.
        
    - Пример: {{ 'hello world' | uppercase }} преобразует строку в "HELLO WORLD".
        

---

### 2. Основные Принципы Разработки в Angular

#### 2.1. TypeScript – Ваше Главное Преимущество!

Angular использует TypeScript, и это огромный плюс, особенно если вы новичок.

- **Что такое TypeScript?** Это "надстройка" над JavaScript, которая добавляет **статическую типизацию**. Это значит, что вы указываете, какого типа данных (число, строка, объект определенной структуры) ожидаете.
    
- **Почему это хорошо для новичка:**
    
    - **Меньше ошибок:** TypeScript ловит многие ошибки **до того, как вы запустите код** (на этапе написания или компиляции), а не когда пользователь столкнется с ними в браузере. Например, если вы попытаетесь вызвать метод, которого нет у объекта, TypeScript вам об этом скажет.
        
    - **Понятный код:** Когда вы видите переменную userName: string, вы сразу понимаете, что это строка. Это делает код более читаемым и самодокументируемым.
        
    - **Улучшенный инструментарий:** Ваш редактор кода (например, VS Code) сможет давать вам отличные подсказки, автодополнение и быструю навигацию по коду.
        
    - **Современные возможности:** TypeScript включает все последние возможности JavaScript (классы, модули, асинхронность) и добавляет к ним типизацию.
        
- **Основные понятия TypeScript, которые вы встретите:**
    
    - **Типы данных:** string, number, boolean, array, object.
        
    - **Интерфейсы (interface):** Используются для определения "структуры" объектов. Это как контракт, который говорит, какие свойства и методы должен иметь объект. Очень полезно для описания данных, которые вы получаете с API.
        
        
        ```typescript
        interface User {
          id: number;
          name: string;
          email?: string; // '?' означает, что свойство может отсутствовать
        }
        
        function displayUser(user: User) {
          console.log(`Имя: ${user.name}, Email: ${user.email || 'N/A'}`);
        }
        ```
        
    - **Классы (class):** Основа объектно-ориентированного программирования в TypeScript. Angular компоненты и сервисы – это классы.
        
        
        ```typescript
        class DataService {
          private apiUrl = '...'; // private - доступно только внутри класса
        
          getData(): Promise<string[]> { // Метод возвращает Promise, который разрешится в массив строк
            // ... логика запроса ...
            return Promise.resolve(['data1', 'data2']);
          }
        }
        ```
        
    - **Декораторы (@):** Специальные метки, которые добавляют метаданные к классам, свойствам, методам или параметрам. Angular использует их повсеместно (@Component, @Injectable, @Input, @Output).
        

        ```typescript
        @Component({
          selector: 'app-my-component',
          templateUrl: './my-component.component.html',
          styleUrls: ['./my-component.component.css']
        })
        export class MyComponent { // export - делает класс доступным для других модулей
          // ...
        }
        ```
        

#### 2.2. Компонентный Подход

- **UI из компонентов:** Вы строите страницу, собирая ее из множества мелких, самодостаточных компонентов.
    
- **Иерархия:** Компоненты могут быть вложены друг в друга.
    
- **Переиспользование:** Компоненты можно использовать в разных частях приложения.
    

#### 2.3. Dependency Injection (DI)

- **Принцип:** Вместо того, чтобы компоненты сами создавали свои зависимости (например, сервисы), Angular предоставляет их через DI-систему.
    
- **Как это выглядит:** Вы объявляете нужный сервис в конструкторе вашего класса (компонента или другого сервиса), а Angular сам создает экземпляр и передает его.
    
    
    ```typescript
    import { Component } from '@angular/core';
    import { DataService } from '../services/data.service'; // Ваш сервис
    
    @Component({ /* ... */ })
    export class MyComponent {
      // Angular DI внедряет экземпляр DataService в конструктор
      constructor(private dataService: DataService) {
        // Теперь вы можете использовать this.dataService
        this.dataService.getData().subscribe(data => {
          console.log(data);
        });
      }
    }
    ```
    
- **Преимущества:** Облегчает тестирование (можно подменить реальный сервис на тестовый), делает код более модульным.
    

#### 2.4. Шаблоны и Привязка Данных (Data Binding)

- **Шаблон (.html):** Здесь вы описываете, как выглядит ваш компонент.
    
- **Специальные конструкции Angular в шаблонах:**
    
    - **Интерполяция {{ property }}:** Вывод значения свойства из класса компонента в HTML.
        
        
        ```html
        <p>Привет, {{ userName }}!</p>
        ```
        
    - **Привязка свойств [property]="data":** Передача данных из класса в DOM-свойство.
        

        ```html
        <img [src]="imageUrl" alt="Фото">
        <button [disabled]="isButtonDisabled">Отправить</button>
        ```
        
    - **Привязка событий (event)="method()":** Реакция на действия пользователя.
        
        
        ```html
        <button (click)="onButtonClick()">Нажми меня</button>
        <input (input)="onInputChange($event)">
        ```
        
    - **Двусторонняя привязка [(ngModel)]="property":** Синхронизация данных между полем ввода и свойством компонента. Часто используется в формах.
        

        ```html
        <input [(ngModel)]="userName">
        ```
        
    - **Структурные директивы (*ngIf, *ngFor):** Управляют структурой DOM.
        
        codeHtml
        
        ```html
        <p *ngIf="isLoggedIn">Добро пожаловать!</p>
        
        <ul>
          <li *ngFor="let item of items">{{ item }}</li>
        </ul>
        ```
        
        Звездочка * перед ngIf и ngFor – это "синтаксический сахар" Angular, который означает, что директива изменяет структуру DOM, добавляя или удаляя элементы.
        

#### 2.5. RxJS (Observables)

- **Назначение:** Angular использует RxJS для работы с асинхронными операциями (например, HTTP-запросы), событиями и управлением потоками данных.
    
- **Observables:** Представляют собой поток данных или событий. Вы "подписываетесь" на Observable, чтобы получать уведомления о новых данных или ошибках.
    
- **Для новичка:** Пока просто знайте, что многие асинхронные операции в Angular (например, запрос данных с сервера) возвращают Observables, на которые нужно будет подписаться, чтобы получить результат.
    

#### 2.6. Angular CLI (Command Line Interface)

- **Что это:** Инструмент командной строки, который сильно упрощает работу с Angular.
    
- **Основные команды (очень полезны для новичка):**
    
    - ng new my-app: Создать новый проект Angular.
        
    - ng generate component my-component (или ng g c my-component): Создать новый компонент (с файлами .ts, .html, .css, .spec.ts).
        
    - ng generate service my-service (или ng g s my-service): Создать новый сервис.
        
    - ng serve: Запустить приложение в режиме разработки (с автоматической перезагрузкой при изменениях).
        
    - ng build: Скомпилировать приложение для продакшена.
        
    - ng test: Запустить тесты.
        

---

### 3. Разработка Приложений в Angular: Ключевые Аспекты

#### 3.1. Структура Проекта

- Angular CLI создает предсказуемую структуру папок.
    
- src/app: Ваше основное приложение – модули, компоненты, сервисы.
    
- src/assets: Изображения, шрифты.
    
- src/environments: Настройки для разных сред (dev/prod).
    

#### 3.2. Роутинг (Angular Router)

- Встроен в Angular.
    
- Определяет, какой компонент отображать при разных URL.
    
- Конфигурируется в модуле роутинга (app-routing.module.ts).
    
- Использует директиву <\router-outlet\> для отображения активного компонента.
    

#### 3.3. HTTP-клиент (HttpClient)

- Встроенный сервис для работы с HTTP-запросами.
    
- Возвращает Observables.
    
- Модуль HttpClientModule нужно импортировать в AppModule.
    

#### 3.4. Формы

- **Шаблонные формы (Template-driven):** Проще для старта, много логики в HTML-шаблоне.
    
- **Реактивные формы (Reactive Forms):** Мощнее, вся логика в TypeScript-классе. Рекомендуется для сложных форм.
    

#### 3.5. Управление Состоянием

- **Локальное состояние:** Свойства класса компонента.
    
- **Сервисы + DI:** Для разделения данных и логики между компонентами.
    
- **RxJS:** Часто используется в сервисах для управления потоками данных.
    
- **NgRx:** Библиотека для управления состоянием в стиле Redux, основанная на RxJS. Аналог Redux для Angular.
    
---

### Заключение для новичка

Angular может показаться сложнее React при первом знакомстве из-за своей "фреймворковой" природы и обязательного использования TypeScript. Однако, TypeScript значительно облегчает разработку в долгосрочной перспективе, а строгая структура Angular помогает создавать большие, надежные приложения.

**Начните с:**

1. Установки Angular CLI (npm install -g @angular/cli).
    
2. Создания нового проекта (ng new my-app).
    
3. Изучения, как создаются и связываются компоненты (@Component, .ts, .html, .css).
    
4. Понимания работы *ngIf, *ngFor и привязки данных ({{}}, [], (), [()]).
    
5. Разбора концепции сервисов и DI.
    
6. Постепенно углубляйтесь в TypeScript, RxJS и роутинг.
    

Angular предоставляет мощный и полный набор инструментов, которые, после освоения, позволяют эффективно разрабатывать сложные веб-приложения.

# 20. Angular: модули, компоненты, сервисы и DI.

### Введение

Angular – это комплексный фреймворк, где все элементы тесно связаны. Основные строительные блоки – **Модули**, **Компоненты** и **Сервисы**, а их взаимодействие происходит благодаря **Dependency Injection (DI)**.

---

### 1. Модули (NgModule)

- **Что это:** Блок, который группирует связанные компоненты, директивы, пайпы и сервисы. Это способ организации вашего приложения.
    
- **Зачем:**
    
    - **Организация:** Разделяет приложение на логические функциональные части.
        
    - **Компиляция:** Помогает Angular компилировать и оптимизировать приложение.
        
    - **Ленивая загрузка (Lazy Loading):** Позволяет загружать модули только тогда, когда они нужны, ускоряя начальную загрузку приложения.
        
- **Структура @NgModule:**
    
    - **declarations:** Компоненты, директивы и пайпы, принадлежащие этому модулю.
        
    - **imports:** Другие модули, необходимые для работы этого модуля (например, BrowserModule, FormsModule, HttpClientModule, другие кастомные модули).
        
    - **providers:** Сервисы, которые будут доступны для этого модуля и его потомков (через DI).
        
    - **exports:** Компоненты, директивы, пайпы и сервисы, которые этот модуль предоставляет для использования другими модулями.
        
    - **bootstrap:** Корневой компонент приложения (только в корневом модуле, обычно AppModule), который Angular монтирует в DOM.
        
- **Пример (AppModule):**
    
    
    ```typescript
    import { NgModule } from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser'; // Модуль для браузерных приложений
    import { HttpClientModule } from '@angular/common/http'; // Модуль для HTTP-запросов
    
    import { AppComponent } from './app.component'; // Корневой компонент
    import { UserListComponent } from './user-list/user-list.component'; // Другой компонент
    import { UserService } from './services/user.service'; // Сервис
    
    @NgModule({
      declarations: [ // Что принадлежит этому модулю
        AppComponent,
        UserListComponent
      ],
      imports: [ // Другие модули, которые нужны здесь
        BrowserModule,
        HttpClientModule,
        // ... другие модули
      ],
      providers: [ // Сервисы, которые будут доступны
        UserService
      ],
      bootstrap: [AppComponent] // Какой компонент запускается первым
    })
    export class AppModule { }
    ```
    

---

### 2. Компоненты (Component)

- **Что это:** Основной строительный блок UI в Angular. Каждый компонент управляет частью DOM.
    
- **Структура компонента:**
    
    1. **Класс TypeScript (.ts):** Содержит логику, данные (свойства) и методы.
        
    2. **HTML-шаблон (.html):** Определяет структуру UI.
        
    3. **CSS-стили (.css, .scss, etc.):** Определяют внешний вид. Angular обеспечивает **изоляцию стилей** по умолчанию.
        
- **Декоратор @Component:**
    
    - Прикрепляется к классу TypeScript.
        
    - Определяет метаданные компонента:
        
        - selector: Уникальный HTML-тег для этого компонента (например, app-user-list).
            
        - templateUrl / template: Путь к файлу шаблона или сам шаблон.
            
        - styleUrls / styles: Пути к файлам стилей или сами стили.
            
- **Пример (user-list.component.ts):**
    
    
    ```typescript
    import { Component, OnInit } from '@angular/core';
    import { UserService } from '../services/user.service'; // Сервис, который будет внедрен
    
    @Component({
      selector: 'app-user-list', // Как использовать этот компонент в другом шаблоне: <app-user-list></app-user-list>
      templateUrl: './user-list.component.html', // HTML-шаблон
      styleUrls: ['./user-list.component.css'] // CSS-стили
    })
    export class UserListComponent implements OnInit { // implements OnInit - означает, что класс реализует интерфейс OnInit
      users: any[] = []; // Свойство для хранения списка пользователей (any - для простоты, лучше использовать интерфейс)
    
      // DI: Angular внедряет UserService в конструктор
      constructor(private userService: UserService) { }
    
      // Метод жизненного цикла: вызывается после инициализации компонента
      ngOnInit(): void {
        this.loadUsers(); // Загружаем пользователей при инициализации
      }
    
      loadUsers(): void {
        this.userService.getUsers().subscribe(data => { // Подписываемся на Observable от сервиса
          this.users = data; // Обновляем свойство users
        });
      }
    }
    ```
    

---

### 3. Сервисы (Service)

- **Что это:** Классы TypeScript, предназначенные для инкапсуляции **бизнес-логики, доступа к данным, работы с API**, или любой другой функциональности, которая не связана напрямую с UI.
    
- **Зачем:**
    
    - **Переиспользование кода:** Логика, используемая в нескольких компонентах, выносится в сервис.
        
    - **Разделение ответственности:** Компоненты сосредоточены на UI, сервисы – на логике.
        
    - **Тестируемость:** Сервисы легко тестировать изолированно.
        
    - **Централизация данных:** Сервисы могут хранить состояние, доступное разным компонентам.
        
- **Декоратор @Injectable:**
    
    - Помечает класс как сервис, который может быть внедрен в другие компоненты или сервисы.
        
    - @Injectable({ providedIn: 'root' }) – это самый распространенный способ регистрации сервиса. Он делает сервис доступным во всем приложении (как синглтон) без необходимости явно добавлять его в providers корневого модуля.
        
- **Пример (user.service.ts):**
    
    
    ```typescript
    import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http'; // Сервис для HTTP-запросов
    import { Observable } from 'rxjs'; // RxJS Observable
    
    @Injectable({
      providedIn: 'root' // Сервис будет предоставлен глобально (синглтон)
    })
    export class UserService {
      private apiUrl = 'https://jsonplaceholder.typicode.com/users'; // URL API
    
      // DI: Angular внедряет HttpClient в конструктор
      constructor(private http: HttpClient) { }
    
      getUsers(): Observable<any[]> { // Метод возвращает Observable
        return this.http.get<any[]>(this.apiUrl); // Выполняем GET-запрос
      }
    
      getUserById(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`);
      }
    }
    ```
    

---

### 4. Dependency Injection (DI)

- **Что это:** **Принцип проектирования**, который Angular использует для управления зависимостями. Вместо того, чтобы класс сам создавал свои зависимости, они "внедряются" ему извне.
    
- **Зачем:**
    
    - **Слабая связанность:** Компоненты и сервисы не привязаны к конкретной реализации своих зависимостей.
        
    - **Тестируемость:** Легко подменить реальные зависимости на "моки" (mock-объекты) при написании тестов.
        
    - **Переиспользование:** Сервисы, предоставленные через DI, могут быть синглтонами, обеспечивая общее состояние и логику.
        
    - **Читаемость:** Четко видно, какие зависимости использует класс.
        
- **Как работает:**
    
    1. **Провайдеры (Providers):** Вы регистрируете "провайдера" для сервиса. Это может быть сделано:
        
        - В @NgModule({ providers: [...] }).
            
        - В @Component({ providers: [...] }) (сервис будет доступен только для этого компонента и его потомков).
            
        - При помощи @Injectable({ providedIn: 'root' }) (самый простой способ для глобальных сервисов).
            
    2. **Внедрение (Injection):** Вы объявляете зависимость в конструкторе класса (компонента или сервиса), указывая тип зависимости.
        
        codeTypeScript
        
        ```
        // Компонент или сервис, который нуждается в UserService
        constructor(private myUserService: UserService) {
          // myUserService теперь является экземпляром UserService
        }
        ```
        
        Angular DI-система находит провайдера для UserService и передает соответствующий экземпляр в конструктор.
        

---

### Краткий итог:

- **Модули (NgModule)** – организуют приложение на блоки.
    
- **Компоненты (Component)** – строят UI (логика .ts, шаблон .html, стили .css).
    
- **Сервисы (Service)** – содержат общую логику и данные (.ts с @Injectable).
    
- **Dependency Injection (DI)** – механизм, который позволяет компонентам и сервисам получать нужные им зависимости (сервисы), делая код модульным, тестируемым и переиспользуемым.

# 21. Angular: шаблоны страниц, жизненный цикл компонентов, подключение CSS.

### Введение

В Angular разработка UI включает в себя создание шаблонов, управление компонентами на протяжении их "жизни" и стилизацию.

---
### 1. Шаблоны Страниц (Templates)

- **Что это:** HTML-разметка, которая определяет структуру и внешний вид компонента. Каждый компонент имеет свой собственный шаблон.
    
- **Как связаны с компонентом:** Шаблон указывается в метаданных декоратора @Component через templateUrl (ссылка на .html файл) или template (сам HTML-код).
    
    
    ```typescript
    @Component({
      selector: 'app-my-component',
      templateUrl: './my-component.component.html', // Ссылка на HTML-файл
      // или template: `<h1>Мой заголовок</h1><p>Текст</p>` // Сам HTML
    })
    export class MyComponent { /* ... */ }
    ```
    
- **Расширения Angular в шаблонах:** Шаблоны Angular – это не просто чистый HTML. Они содержат специальные конструкции:
    
    - **Интерполяция {{ ... }}:** Отображение значений свойств компонента.
        
        ```html
        <p>Имя пользователя: {{ userName }}</p>
        ```
        
    - **Привязка свойств [property]="...":** Установка DOM-свойств элемента на основе значений из компонента.
        
        
        ```html
        <img [src]="imageUrl" alt="Описание">
        <button [disabled]="isFormInvalid">Отправить</button>
        ```
        
    - **Привязка событий (event)="...":** Реакция на события DOM, вызывая методы компонента.
        
        
        ```html
        <button (click)="saveChanges()">Сохранить</button>
        <input (input)="onInput($event)">
        ```
        
    - **Двусторонняя привязка [(ngModel)]="...":** Для форм. Синхронизирует значение поля ввода с свойством компонента в обе стороны. Требует импорта FormsModule в модуль.
        
        ```html
        <input [(ngModel)]="userName">
        ```
        
    - **Структурные директивы (*ngIf, *ngFor, *ngSwitch):** Манипулируют структурой DOM (добавляют/удаляют элементы). Звездочка * – синтаксический сахар.
        
        
        ```html
        <p *ngIf="showElement">Этот текст виден, если showElement true.</p>
        <ul>
          <li *ngFor="let item of itemList">{{ item }}</li>
        </ul>
        ```
        
    - **Атрибутивные директивы ([ngStyle], [ngClass]):** Изменяют внешний вид или поведение существующего элемента.
        
        
        ```html
        <div [ngStyle]="{ 'color': isError ? 'red' : 'black' }">Статус</div>
        <div [ngClass]="{ 'active': isActive, 'error': hasError }">Сообщение</div>
        ```
        
    - **router-outlet:** Специальный компонент-директива, куда Angular вставляет компоненты, соответствующие текущему маршруту.
        

---

### 2. Жизненный Цикл Компонентов (Component Lifecycle)

Каждый компонент Angular проходит через ряд этапов с момента своего создания до полного удаления из DOM. Angular предоставляет специальные **хуки жизненного цикла** – методы, которые можно реализовать в классе компонента, чтобы выполнить код в определенный момент.

- **Основные хуки:**
    
    1. **ngOnChanges(changes: SimpleChanges):**
        
        - Вызывается **перед** ngOnInit и **перед каждым** изменением входных свойств (@Input) компонента.
            
        - Позволяет отреагировать на изменение входных данных.
            
        - changes – объект, содержащий информацию об изменившихся свойствах.
            
    2. **ngOnInit():**
        
        - Вызывается **один раз** после инициализации компонента и его входных свойств (@Input).
            
        - Идеальное место для выполнения первичной инициализации: загрузка данных, подписка на события.
            
    3. **ngDoCheck():**
        
        - Вызывается **при каждом** обнаружении изменений, как при использовании ngOnChanges, так и при любом другом изменении, которое Angular не может отследить автоматически.
            
        - Используется для более сложной или пользовательской логики обнаружения изменений. Используется редко.
            
    4. **ngAfterContentInit():**
        
        - Вызывается **один раз** после того, как Angular завершил инициализацию **внешнего контента** <ng-conten\>), который был внедрен в компонент.
            
        - Полезно, когда нужно работать с элементами, внедренными через Content Projection.
            
    5. **ngAfterContentChecked():**
        
        - Вызывается **после каждого** ngDoCheck и **после каждого** ngAfterContentInit.
            
        - Позволяет проверить внешний контент после его проверки.
            
    6. **ngAfterViewInit():**
        
        - Вызывается **один раз** после того, как Angular инициализировал **представление (View)** компонента и его дочерние представления.
            
        - Идеальное место для работы с DOM-элементами, созданными в шаблоне компонента (например, для инициализации сторонних библиотек, которые работают с DOM).
            
    7. **ngAfterViewChecked():**
        
        - Вызывается **после каждого** ngDoCheck и **после каждого** ngAfterViewInit.
            
        - Позволяет проверить представление после его проверки.
            
    8. **ngOnDestroy():**
        
        - Вызывается **непосредственно перед тем**, как Angular уничтожит компонент или директиву.
            
        - Используется для выполнения "очистки": отписки от подписок (Observable), освобождения ресурсов, отмены таймеров. **Очень важно для предотвращения утечек памяти.**
            
- **Порядок вызова (для компонента, который монтируется):**
    
    1. ngOnChanges (если есть @Input)
        
    2. ngOnInit
        
    3. ngDoCheck (если реализован)
        
    4. ngAfterContentInit (если есть \<ng-content\>)
        
    5. ngAfterContentChecked (если реализован, после ngAfterContentInit)
        
    6. ngAfterViewInit
        
    7. ngAfterViewChecked (после ngAfterViewInit)
        
    
    - При последующих изменениях: ngOnChanges -> ngDoCheck -> ngAfterContentChecked -> ngAfterViewChecked.
        
    - Перед удалением: ngOnDestroy.
        

---

### 3. Подключение CSS (Стилизация Компонентов)

Angular обеспечивает **изоляцию стилей** для каждого компонента. Это означает, что CSS, написанный для одного компонента, не будет влиять на другие компоненты, если вы не укажете это явно.

- **Способы подключения стилей:**
    
    1. **Изолированные стили (Emulated Scoping - по умолчанию):**
        
        - Angular добавляет уникальный атрибут (например, _ngcontent-c1) к HTML-элементам компонента и к CSS-селекторам. Это гарантирует, что стили применяются только к элементам этого компонента.
            
        - **Как использовать:**
            
            - Указать styleUrls: ['./my-component.component.css'] в декораторе @Component.
                
            - Написать CSS в этом файле, используя обычные селекторы (классы, теги, ID).
                
            
            ```typescript
            @Component({
              selector: 'app-my-component',
              templateUrl: './my-component.component.html',
              styleUrls: ['./my-component.component.css'] // Указываем путь к CSS-файлу
            })
            export class MyComponent { /* ... */ }
            ```
            
            
            ```css
            /* my-component.component.css */
            .my-class {
              color: blue;
            }
            button { /* Этот стиль применится только к <button> внутри этого компонента */
              background-color: lightblue;
            }
            ```
            
    2. **Встроенные стили (Inline Styles):**
        
        - Можно указать стили непосредственно в декораторе @Component.
            
        - **Как использовать:**
            
            - styles: ['h1 { color: red; }', 'p { font-weight: bold; }']
                
            
            codeTypeScript
            
            ```typescript
            @Component({
              selector: 'app-my-component',
              templateUrl: './my-component.component.html',
              styles: [`
                h1 { color: red; }
                p { font-weight: bold; }
              `]
            })
            export class MyComponent { /* ... */ }
            ```
            
        - **Преимущество:** Удобно для небольших стилей.
            
        - **Недостаток:** Менее читаемо для большого количества стилей.
            
    3. **Глобальные стили:**
        
        - CSS-файлы, которые применяются ко всему приложению.
            
        - **Как использовать:** Импортируйте их в корневой файл стилей (src/styles.css или src/styles.scss), который указан в angular.json (или angular-cli.json).
            
        - **Сценарии:** Для сброса стилей (reset/normalize.css), стилизации глобальных элементов (body, html) или импорта CSS-фреймворков (Bootstrap, Tailwind CSS).
            
        - **Внимание:** Глобальные стили не имеют изоляции и могут повлиять на любой элемент в приложении.
            
    4. **Инкапсуляция стилей (View Encapsulation):**
        
        - @Component({ encapsulation: ViewEncapsulation.Emulated }) (по умолчанию).
            
        - @Component({ encapsulation: ViewEncapsulation.ShadowDom }). Использование Shadow DOM браузера для полной изоляции.
            
        - @Component({ encapsulation: ViewEncapsulation.None }). Полное отсутствие изоляции – стили становятся глобальными.
            

---

### Заключение

Шаблоны определяют, как выглядит ваш UI, жизненный цикл позволяет управлять логикой на разных этапах существования компонента, а изоляция стилей обеспечивает предсказуемый внешний вид. Понимание этих концепций критически важно для эффективной разработки в Angular.

# 22. Angular: клиент-серверное взаимодействие, создание, отправка и валидация данных форм.


### Введение

Разработка веб-приложений практически всегда включает взаимодействие между клиентом (браузером) и сервером. Angular предоставляет мощные инструменты для работы с HTTP-запросами, формами и валидацией данных.

---

### 1. Клиент-серверное Взаимодействие

- **HttpClientModule:**
    
    - Основной модуль Angular для выполнения HTTP-запросов.
        
    - Предоставляет сервис HttpClient, который нужно импортировать и использовать.
        
    - **Важно:** HttpClientModule нужно импортировать в корневой модуль (AppModule) или в тот модуль, где вы планируете использовать HttpClient.
        
    

    ```typescript
    // app.module.ts
    import { HttpClientModule } from '@angular/common/http';
    
    @NgModule({
      // ...
      imports: [
        BrowserModule,
        HttpClientModule, // Импортируем модуль
        // ...
      ],
      // ...
    })
    export class AppModule { }
    ```
    
- **HttpClient:**
    
    - Сервис, который инъецируется в компоненты или сервисы через DI.
        
    - Предоставляет методы для различных HTTP-методов: get(), post(), put(), delete(), request() и др.
        
    - **Возвращает Observables:** Все методы HttpClient возвращают Observables из библиотеки RxJS. Это означает, что запрос не выполняется, пока вы не **подпишетесь** на Observable.
        

    
    ```typescript
    import { HttpClient } from '@angular/common/http';
    import { Observable } from 'rxjs';
    import { map, catchError } from 'rxjs/operators'; // Операторы RxJS
    
    @Injectable({ providedIn: 'root' })
    export class ApiService {
      private apiUrl = 'https://api.example.com';
    
      constructor(private http: HttpClient) { }
    
      getData(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/items`)
          .pipe(
            map(response => response), // Обработка успешного ответа
            catchError(error => { // Обработка ошибок
              console.error('Ошибка при загрузке данных:', error);
              // Можно выбросить новую ошибку или вернуть Observable с ошибкой
              throw new Error('Не удалось загрузить данные.');
            })
          );
      }
    
      createItem(item: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/items`, item);
      }
    }
    ```
    
- **Подписка (Subscription):**
    
    - Чтобы запрос начал выполняться, нужно вызвать .subscribe() на Observable.
        
    - subscribe() принимает колбэк для успешного ответа и колбэк для ошибки.
        
    - **Важно:** Всегда отписывайтесь от подписок, когда они больше не нужны, чтобы избежать утечек памяти (обычно в ngOnDestroy).
        

    
    ```typescript
    // В компоненте или другом сервисе
    import { Subscription } from 'rxjs';
    
    private apiSubscription: Subscription;
    
    ngOnInit() {
      this.apiSubscription = this.apiService.getData().subscribe(data => {
        console.log('Полученные данные:', data);
        // Обработка данных
      }, error => {
        console.error('Произошла ошибка:', error);
      });
    }
    
    ngOnDestroy() {
      if (this.apiSubscription) {
        this.apiSubscription.unsubscribe(); // Отписка
      }
    }
    ```
    

---

### 2. Формы в Angular

Angular предоставляет два основных подхода к работе с формами:

#### 2.1. Шаблонные формы (Template-driven Forms)

- **Концепция:** Логика формы находится в основном в HTML-шаблоне, используя директивы.
    
- **Подходит для:** Простых форм, где валидация не очень сложная.
    
- **Ключевые элементы:**
    
    - **FormsModule:** Необходимо импортировать в модуль.
        
    - **[(ngModel)]:** Директива для двусторонней привязки данных между полем ввода и свойством компонента.
        
    - **name атрибут:** Обязателен для полей, используемых с ngModel.
        
    - **ngForm:** Директива, которая управляет всей формой.
        
    - **Валидационные директивы:** required, minlength, maxlength, pattern, email и пользовательские.
        
- **Пример:**

    
    ```typescript
    // app.module.ts
    import { FormsModule } from '@angular/forms';
    
    @NgModule({
      imports: [
        // ...
        FormsModule
      ],
      // ...
    })
    export class AppModule { }
    
    // my-form.component.ts
    import { Component } from '@angular/core';
    
    @Component({
      selector: 'app-my-form',
      templateUrl: './my-form.component.html'
    })
    export class MyFormComponent {
      user = { // Модель данных для формы
        name: '',
        email: ''
      };
    
      onSubmit(form: any): void { // form - это объект NgForm
        if (form.valid) {
          console.log('Форма валидна, данные:', this.user);
          // Отправка данных на сервер...
        } else {
          console.log('Форма невалидна');
        }
      }
    }
    ```
    
    
    ```html
    <!-- my-form.component.html -->
    <form #myForm="ngForm" (ngSubmit)="onSubmit(myForm)">
      <div>
        <label for="name">Имя:</label>
        <input
          type="text"
          id="name"
          name="name"
          [(ngModel)]="user.name"
          required
          minlength="3"
          #nameInput="ngModel" <!-- Для доступа к состоянию поля -->
        >
        <div *ngIf="nameInput.invalid && (nameInput.dirty || nameInput.touched)">
          <div *ngIf="nameInput.errors?.['required']">Имя обязательно.</div>
          <div *ngIf="nameInput.errors?.['minlength']">Имя должно быть минимум 3 символа.</div>
        </div>
      </div>
    
      <div>
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          [(ngModel)]="user.email"
          required
          email <!-- Встроенная директива валидации email -->
          #emailInput="ngModel"
        >
        <div *ngIf="emailInput.invalid && (emailInput.dirty || emailInput.touched)">
          <div *ngIf="emailInput.errors?.['required']">Email обязателен.</div>
          <div *ngIf="emailInput.errors?.['email']">Введите корректный email.</div>
        </div>
      </div>
    
      <button type="submit" [disabled]="myForm.invalid">Отправить</button>
    </form>
    ```
    

#### 2.2. Реактивные формы (Reactive Forms)

- **Концепция:** Логика формы находится в классе компонента TypeScript. Форма создается программно.
    
- **Подходит для:** Более сложных форм, динамических форм, продвинутой валидации.
    
- **Ключевые элементы:**
    
    - **ReactiveFormsModule:** Необходимо импортировать в модуль.
        
    - **FormGroup:** Объект, представляющий форму как целое.
        
    - **FormControl:** Объект, представляющий одно поле ввода.
        
    - **FormBuilder:** Сервис, помогающий создавать FormGroup и FormControl с меньшим кодом.
        
    - **Валидаторы:** Функции, которые проверяют корректность данных (встроенные и кастомные).
        
- **Пример:**
    
    ```typescript
    // app.module.ts
    import { ReactiveFormsModule } from '@angular/forms';
    
    @NgModule({
      imports: [
        // ...
        ReactiveFormsModule
      ],
      // ...
    })
    export class AppModule { }
    
    // my-reactive-form.component.ts
    import { Component, OnInit } from '@angular/core';
    import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
    
    @Component({
      selector: 'app-my-reactive-form',
      templateUrl: './my-reactive-form.component.html'
    })
    export class MyReactiveFormComponent implements OnInit {
      myForm: FormGroup; // Объявляем FormGroup
    
      // Внедряем FormBuilder для упрощения создания формы
      constructor(private fb: FormBuilder) { }
    
      ngOnInit(): void {
        this.myForm = this.fb.group({
          // FormControl(начальное_значение, [валидаторы])
          name: ['', [Validators.required, Validators.minLength(3)]],
          email: ['', [Validators.required, Validators.email]],
          address: this.fb.group({ // Вложенный FormGroup
            street: [''],
            city: ['']
          }),
          hobbies: this.fb.array([]) // FormArray для списка элементов
        });
      }
    
      // Геттер для доступа к FormControl "name" из шаблона
      get name() { return this.myForm.get('name'); }
      get email() { return this.myForm.get('email'); }
      get address() { return this.myForm.get('address'); }
      get hobbies() { return this.myForm.get('hobbies') as FormArray; } // Type assertion для FormArray
    
      addHobby() {
        this.hobbies.push(this.fb.control('')); // Добавляем новое поле для хобби
      }
    
      onSubmit(): void {
        if (this.myForm.valid) {
          console.log('Форма валидна, данные:', this.myForm.value);
          // Отправка данных на сервер...
        } else {
          console.log('Форма невалидна');
          // Можно вызвать this.myForm.markAllAsTouched() чтобы показать ошибки всем полям
        }
      }
    }
    ```
    
    
    ```html;
    <!-- my-reactive-form.component.html -->
    <form [formGroup]="myForm" (ngSubmit)="onSubmit()">
      <div>
        <label for="name">Имя:</label>
        <input type="text" id="name" formControlName="name">
        <div *ngIf="name?.invalid && (name?.dirty || name?.touched)">
          <div *ngIf="name?.errors?.['required']">Имя обязательно.</div>
          <div *ngIf="name?.errors?.['minlength']">Имя должно быть минимум 3 символа.</div>
        </div>
      </div>
    
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" formControlName="email">
        <div *ngIf="email?.invalid && (email?.dirty || email?.touched)">
          <div *ngIf="email?.errors?.['required']">Email обязателен.</div>
          <div *ngIf="email?.errors?.['email']">Введите корректный email.</div>
        </div>
      </div>
    
      <!-- Вложенный FormGroup -->
      <div formGroupName="address">
        <h3>Адрес:</h3>
        <div>
          <label for="street">Улица:</label>
          <input type="text" id="street" formControlName="street">
        </div>
        <div>
          <label for="city">Город:</label>
          <input type="text" id="city" formControlName="city">
        </div>
      </div>
    
      <!-- FormArray -->
      <h3>Хобби:</h3>
      <div formArrayName="hobbies">
        <div *ngFor="let hobbyControl of hobbies.controls; let i = index" [formGroupName]="i">
          <input type="text" [formControlName]="0"> <!-- FormArray элементы имеют индекс 0 -->
        </div>
      </div>
      <button type="button" (click)="addHobby()">Добавить хобби</button>
    
      <button type="submit" [disabled]="myForm.invalid">Отправить</button>
    </form>
    ```
    

---

### 3. Отправка и Валидация Данных

- **Отправка:**
    
    - **Шаблонные формы:** Используется (ngSubmit) на теге \<form\> и form.valid для проверки. Данные извлекаются из модели (user.name, user.email).
        
    - **Реактивные формы:** Используется (ngSubmit) на теге \<form\> и myForm.valid для проверки. Данные доступны через myForm.value.
        
    - В обоих случаях, после проверки формы на валидность, вы вызываете метод сервиса (например, apiService.createItem(formData)), который выполняет HTTP POST/PUT запрос.
        
- **Валидация:**
    
    - **Встроенные валидаторы:** Angular предоставляет готовые валидаторы: Validators.required, Validators.minLength, Validators.maxLength, Validators.pattern, Validators.email.
        
    - **Пользовательские валидаторы:** Вы можете создавать свои собственные функции валидации, которые возвращают null (если валидно) или объект ошибки (если невалидно).
        
    - **Асинхронные валидаторы:** Для проверки, например, уникальности email, отправляя запрос на сервер.
        
    - **Отображение ошибок:** В шаблоне формы используется условный рендеринг (*ngIf) для показа сообщений об ошибках, когда поле невалидно (.invalid) и было взаимодействовало с ним (.dirty || .touched).
        
        - **Шаблонные формы:** Обращение к состоянию поля через ngModel переменные (например, #nameInput="ngModel").
            
        - **Реактивные формы:** Обращение через геттеры (get name()) или напрямую через myForm.get('name').
            

---

### Заключение

Angular предоставляет гибкие и мощные инструменты для работы с формами и клиент-серверным взаимодействием. HttpClient работает с Observables для асинхронных запросов, а два подхода к формам (шаблонные и реактивные) позволяют выбрать наиболее подходящий способ для управления данными и их валидации в зависимости от сложности задачи. Выбор между шаблонными и реактивными формами часто зависит от сложности формы и предпочтений команды.

