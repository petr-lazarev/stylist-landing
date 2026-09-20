# Сайт персонального стилиста

Минималистичный одностраничный сайт для персонального стилиста. Статический сайт на HTML, CSS и JavaScript без фреймворков и сборщиков.

## Как открыть сайт локально

### Вариант 1: Прямое открытие в браузере
1. Откройте папку с проектом
2. Дважды кликните на файл `index.html`
3. Сайт откроется в вашем браузере по умолчанию

### Вариант 2: Через локальный сервер (рекомендуется)
Если у вас установлен Python:

```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Затем откройте в браузере: `http://localhost:8000`

Если у вас установлен Node.js, можно использовать:

```bash
npx serve
```

## Как изменить контент

### Изменить имя и основную информацию

Откройте файл `index.html` и найдите секцию `<!-- Hero Section -->`:

```html
<h1 class="hero-name">Анна Иванова</h1>
<p class="hero-subtitle">Персональный стилист</p>
<p class="hero-location">Онлайн — из любой точки мира. Лично — в GTA.</p>
<p class="hero-tagline">Стиль как способ узнать себя и проявиться.</p>
```

Замените **Анна Иванова** на ваше имя и измените другой текст по желанию.

### Изменить контакты

Найдите секцию `<!-- Contact Section -->` в файле `index.html`:

```html
<a href="https://t.me/username" class="contact-link">Telegram: @username</a>
<a href="https://wa.me/10000000000" class="contact-link">WhatsApp: +1 000 000 0000</a>
<a href="https://instagram.com/username" class="contact-link">Instagram: @username</a>
<a href="mailto:hello@example.com" class="contact-link">Email: hello@example.com</a>
```

Замените:
- `username` на ваш реальный Telegram/Instagram username
- `10000000000` на ваш номер телефона (в формате без пробелов и знаков)
- `hello@example.com` на ваш email

### Изменить цены

Найдите секцию `<!-- Pricing Section -->`:

```html
<div class="price-item">
    <h3 class="price-service">Онлайн-консультация</h3>
    <p class="price-amount">от CAD $90</p>
</div>
```

Измените суммы на актуальные для ваших услуг.

### Изменить текст в разделах

Все тексты находятся в файле `index.html` в соответствующих секциях:
- `<!-- About Section -->` — Обо мне
- `<!-- Services Section -->` — Услуги
- `<!-- Reviews Section -->` — Отзывы
- и т.д.

Просто откройте файл в текстовом редакторе и измените нужный текст.

### Добавить фотографии

По умолчанию используются серые плейсхолдеры для изображений.

Чтобы добавить реальные фотографии:

1. Создайте папку `images` в корне проекта
2. Поместите туда ваши фотографии (желательно в формате `.jpg` или `.png`)
3. Откройте `index.html` и найдите блоки с классом `image-placeholder`

Например, для фото стилиста в секции "Обо мне":

**Было:**
```html
<div class="image-placeholder">
    <span>Фото стилиста</span>
</div>
```

**Станет:**
```html
<img src="images/photo.jpg" alt="Анна Иванова">
```

4. Добавьте в `styles.css` стили для изображений:

```css
.about-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.work-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
```

## Как опубликовать на GitHub Pages

### Шаг 1: Создайте репозиторий на GitHub

1. Откройте [github.com](https://github.com) и войдите в аккаунт
2. Нажмите **New repository**
3. Придумайте имя (например, `stylist-website`)
4. Выберите **Public**
5. Нажмите **Create repository**

### Шаг 2: Загрузите файлы

Если вы работаете через командную строку:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/ваш-username/stylist-website.git
git push -u origin main
```

Замените `ваш-username` на ваш реальный GitHub username.

### Шаг 3: Включите GitHub Pages

1. Откройте ваш репозиторий на GitHub
2. Перейдите в **Settings** (Настройки)
3. В левом меню выберите **Pages**
4. В разделе **Source** выберите ветку `main` и папку `/ (root)`
5. Нажмите **Save**
6. Через несколько минут ваш сайт будет доступен по адресу: `https://ваш-username.github.io/stylist-website/`

### Шаг 4: Обновление сайта

После изменений в коде:

```bash
git add .
git commit -m "Обновление контента"
git push
```

Сайт автоматически обновится через несколько минут.

## Настройка собственного домена (опционально)

1. Купите домен (например, на [Namecheap](https://namecheap.com) или [GoDaddy](https://godaddy.com))
2. В настройках GitHub Pages добавьте ваш домен в поле **Custom domain**
3. В настройках DNS вашего домена добавьте CNAME-запись:
   - Host: `www`
   - Value: `ваш-username.github.io`
4. Подробная инструкция: [GitHub Docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

## Структура файлов

```
stylist-landing/
├── index.html       # Основной HTML-файл со всеми секциями
├── styles.css       # Стили (дизайн и адаптивность)
├── script.js        # JavaScript (навигация, плавная прокрутка)
└── README.md        # Документация (этот файл)
```

## Технические характеристики

- **Без фреймворков**: только чистый HTML, CSS, JavaScript
- **Адаптивный дизайн**: работает на десктопе, планшете и телефоне
- **Без сборщиков**: не требуется Node.js, npm или другие инструменты
- **Статический**: может быть размещен на любом хостинге
- **SEO-оптимизация**: базовые meta-теги для поисковых систем
- **Accessibility**: поддержка prefers-reduced-motion

## Поддержка

Если у вас возникли вопросы или проблемы:
1. Проверьте, что все файлы находятся в одной папке
2. Убедитесь, что пути к файлам указаны правильно
3. Откройте консоль браузера (F12) для проверки ошибок

## Лицензия

Свободное использование. Вы можете изменять и использовать этот код как угодно.
