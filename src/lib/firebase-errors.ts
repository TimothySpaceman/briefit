export function getFirebaseErrorMessage(code: string): string {
    switch (code) {
        case "auth/invalid-email":
            return "Невірний формат email."

        case "auth/invalid-credential":
            return "Невірний email або пароль."

        case "auth/user-disabled":
            return "Обліковий запис вимкнено."

        case "auth/user-not-found":
            return "Користувача з таким email не існує."

        case "auth/wrong-password":
            return "Невірний пароль."

        case "auth/email-already-in-use":
            return "Цей email вже зареєстровано."

        case "auth/weak-password":
            return "Пароль занадто слабкий (мінімум 6 символів)."

        case "auth/operation-not-allowed":
            return "Цей спосіб входу вимкнено."

        case "auth/account-exists-with-different-credential":
            return "Акаунт з цим email вже існує з іншим способом входу."

        case "auth/popup-closed-by-user":
        case "auth/cancelled-popup-request":
            return "Вхід через Google скасовано."

        case "auth/popup-blocked":
            return "Браузер заблокував спливаюче вікно входу."

        case "auth/network-request-failed":
            return "Помилка мережі. Перевірте підключення до інтернету."

        case "auth/too-many-requests":
            return "Забагато спроб. Спробуйте пізніше."

        case "auth/requires-recent-login":
            return "Для цієї дії потрібно повторно увійти в акаунт."

        case "auth/app-not-authorized":
            return "Додаток не авторизований для Firebase."

        case "auth/unauthorized-domain":
            return "Цей домен не дозволений для авторизації."

        default:
            return "Сталася невідома помилка. Спробуйте пізніше."
    }
}