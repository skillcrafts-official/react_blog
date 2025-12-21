import Span from '@/components/ui/Label/Span';
import styles from './CompliantBunner.module.css'
import ActionButton from '@/components/ui/Button/ActionButton';
import RegistrationPermanentUser from '../auth/components/Registration/RegistrationPermanentUser';
import { Form, Link } from 'react-router-dom';
import { useGlobalState } from '@/lib/providers/GlobalProvider';

function RussianTemporaryCompliantBanner() {
  const { handleLogStatus } = useGlobalState();

  function handleLogin() {
    handleLogStatus("login");
  }

  return (
    <div className={`flex flex-col w-full h-full gap-3 items-center justify-center my-3 p-3 border-1 rounded-[12px] border-[#828282ff] ${styles['ru-compliance-banner']}`} role="dialog" aria-label="Согласие на обработку данных">
      <div className={`${styles['banner-content']} flex flex-col gap-5 items-center justify-center`}>
        <div className='flex flex-col gap-5 items-center text-center'>
          <strong>Зарегистрируем для вас временный профиль!</strong>
          <p>После регистрации вы автоматически войдёте как Гость. Ваша гостевая учётная запись будет привязана к текущему браузеру и устройству, поэтому совершая вход из другого места вы станете новым гостем. При желании вы можете легко расширить свой профиль до полноценного.</p>
          <p className='text-[12px]'>Нажимая кнопку <strong>Войти как Гость</strong>,
            вы подтверждаете, что</p>
            <ul className='text-[12px]'>
              <li>принимаете <a href="/privacy" target="_blank">
                <Span variant='link' className='text-[#107effff] text-[12px] underline'>Политику конфиденциальности</Span>
                </a> и
              </li>
              <li>даёте согласие на обработку персональных данных</li>
            </ul>
            <p className='text-[12px]'>Спасибо за доверие!</p>
          {/* <div className="legal-links">
            <a href="/privacy" target="_blank">Политика конфиденциальности</a>
            • 
            <a href="/cookie-policy" target="_blank">Использование cookies</a>
          </div> */}
        
        
        {/* <div className="banner-actions"> */}
            <Form method="POST"
              action="/auth/login?guest=true">
              <ActionButton 
                onClick={handleLogin}
                // className="btn-accept"
                type='submit'
                isConfirmed
                aria-label="Войти как Гость"
              >
                Войти как Гость
              </ActionButton>
            </Form>
          </div>
          {/* <ActionButton 
            // onClick={rejectAll}
            // variant='chanel'
            // className="btn-reject"
            aria-label="Отклонить"
          >
            Отклонить
          </ActionButton>
          
          <ActionButton 
            // onClick={openSettings}
            // className="btn-settings"
            aria-label="Настроить"
          >
            Настроить
          </ActionButton> */}
        {/* </div> */}
      </div>
    </div>
  );
}

export default RussianTemporaryCompliantBanner;


export function RussianPermanentCompliantBanner() {
  return (
    <div className={`flex flex-col w-full h-full gap-3 items-center justify-center p-3 border-1 rounded-[12px] border-[#828282ff] ${styles['ru-compliance-banner']}`} role="dialog" aria-label="Согласие на обработку данных">
      <div className={`${styles['banner-content']} flex flex-col gap-5 items-center justify-center`}>
        <div className='flex flex-col gap-5 items-center text-center'>
          <strong>Зарегистрируем для вас постоянный профиль!</strong>
          <p>После регистрации на указанную почту вы получите сообщение с кодом подтверждения. Этот код нужно будет ввести в форму подтверждения, на которую вы будуте автоматически перенаправлены после регистрации.</p>
          <p className='text-[12px]'>Нажимая кнопку <strong>Зарегистрироваться</strong>,
            вы подтверждаете, что</p>
            <ul className='text-[12px]'>
              <li>принимаете <a href="/privacy" target="_blank">
                <Span variant='link' className='text-[#107effff] text-[12px] underline'>Политику конфиденциальности</Span>
                </a> и
              </li>
              <li>даёте согласие на обработку персональных данных</li>
            </ul>
            <p className='text-[12px]'>Спасибо за доверие!</p>
        
          <RegistrationPermanentUser/>
        {/* <div className="banner-actions"> */}
            {/* <ActionButton 
              onClick={acceptAll}
              className="btn-accept"
              aria-label="Принять, разрешить и зарегистрироваться"
            >
              Принять, разрешить и зарегистрироваться
            </ActionButton>*/}
          </div>
          {/* <ActionButton 
            // onClick={rejectAll}
            // variant='chanel'
            // className="btn-reject"
            aria-label="Отклонить"
          >
            Отклонить
          </ActionButton>
          
          <ActionButton 
            // onClick={openSettings}
            // className="btn-settings"
            aria-label="Настроить"
          >
            Настроить
          </ActionButton> */}
        {/* </div> */}
      </div>
    </div>
  );
};
