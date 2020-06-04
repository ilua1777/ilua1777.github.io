        //Установка куки
        function setCookie(name, value, options = {}) {

            options = {
              path: '/',
              // при необходимости добавьте другие значения по умолчанию
              ...options
            };
          
            if (options.expires instanceof Date) {
              options.expires = options.expires.toUTCString();
            }
          
            let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
          
            for (let optionKey in options) {
              updatedCookie += "; " + optionKey;
              let optionValue = options[optionKey];
              if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
              }
            }
          
            document.cookie = updatedCookie;
        }
        //Удаление куки
        function deleteCookie(name) {
            setCookie(name, "", {
              'max-age': -1
            })
          }
        //Получение значения куки
        function getCookie ( cookie_name )
        {
            var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
            if (results)
                return ( unescape (results[2]));
            else
                return null;
        }