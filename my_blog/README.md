# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Функциональные задания
## ФЗ-1 | Профиль пользователя
### ФЗ-1-2 Функции изменения данных для входа
- В профиле должна быть возможность менять email для входа
- А также менять пароль
- При изменении поля должны валидироваться
#### Изменение Email
Email должен меняться следующим образом:
- После нажатия на кнопку Изменить Email должно приходить по почте письмо со ссылкой на форму изменения.
- После изменения Email должен быть редирект на страницу ConfirmEmailForm, а на новый Email должно приходить письмо с кодом.
- После успешной попытки ввести код, Email меняется окончательно и профиль подтверждается.
- Повторная авторизация не требуется (пока не истечет срок access_token)
#### Изменение пароля
Подход схожий: на Email приходит ссылка на изменение пароля. После изменения пароля повторная авторизация не требуется.
### ФЗ-1-1 CRUD операции (Создание, Чтение и Обновление)
Профиль пользователя должен быть реализован как отдельный компонент-страница в виде формы для отправки/получения. *СДЕЛАНО*

При переходе по url /profile/ в форму должны автоматически подгружаться данные профиля из БД. Реализация через router-loading. *СДЕЛАНО*

Далее пользователь должен иметь возможность изменить данные. *СДЕЛАНО*

Если пользователь только что зарегистрировался, то при переходе в профиль должно появляться предложение его создать.

Набор данных профиля должен соответствовать модели Django: *СДЕЛАНО*
```
class Profile(models.Model):
    """
    Модель для профиля пользователя
    """
    first_name = models.CharField(max_length=20, null=True, blank=True)
    last_name = models.CharField(max_length=20, null=True, blank=True)
    profession = models.CharField(max_length=50, null=True, blank=True)
    short_desc = models.CharField(max_length=300, null=True, blank=True)
    full_desc = models.TextField(null=True, blank=True)

    wallpaper = models.ImageField(upload_to='wallpapers/', null=True, blank=True)
    avatar = models.ImageField(upload_to=user_avatar_path, null=True, blank=True)

    link_to_instagram = models.URLField(null=True, blank=True)
    link_to_vk = models.URLField(null=True, blank=True)

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        primary_key=True,
        related_name='profiles'
    )

    # остальная логика
```