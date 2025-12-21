import { Form } from 'react-router-dom';
import styles from './Privacy.module.css'

import Title from "@/components/ui/Label/Title"
import Input from '@/components/ui/Input/Input';
import ActionButton from '@/components/ui/Button/ActionButton';
import Feedback from '../Feedback/Feedback';

function Privacy() {
    return (
        <div className="flex flex-col justify-center items-center">
            <Title>Политика конфиденциальности</Title>
            <ul className={styles['ul']}>
                <li className={styles['li']}>
                    <Title variant='secondary'>
                        1. Основные положения
                    </Title>
                    <p>
                        Настоящая Политика конфиденциальности разработана в соответствии с законодательством Российской Федерации (в частности, Федеральным законом № 152-ФЗ "О персональных данных") и учитывает лучшие международные практики (GDPR рекомендации для зарубежных пользователей).
                    </p>
                </li>
                <li className={styles['li']}>
                    <Title variant='secondary'>
                        2. Какие данные мы собираем
                    </Title>
                    <ul>
                        <li>
                            Минимально необходимые данные: имя, email (при регистрации или подписке).
                        </li>
                        <li>
                            Технические данные: IP-адрес, тип браузера, данные cookie (для корректной работы сайта).
                        </li>
                        <li>
                            Дополнительные данные (только с вашего явного согласия): телефон, город, другие сведения.
                        </li>
                    </ul>
                </li>
                <li className={styles['li']}>
                    <Title variant='secondary'>
                        3. Как мы используем данные
                    </Title>
                    <ul>
                        <li>
                            Для ответов на ваши запросы.
                        </li>
                        <li>
                            Для улучшения работы сайта (аналитика).
                        </li>
                        <li>
                            Для рассылки информации (только при наличии согласия).
                        </li>
                    </ul>
                </li>
                <li className={styles['li']}>
                    <Title variant='secondary'>
                        4. Защита данных
                    </Title>
                    <Title variant='tertiary'>
                        Мы принимаем базовые меры защиты:
                    </Title>
                    <ul>
                        <li>
                            SSL-шифрование передаваемых данных
                        </li>
                        <li>
                            Ограниченный доступ к персональным данным сотрудников
                        </li>
                        <li>
                            Регулярное обновление систем безопасности
                        </li>
                    </ul>
                </li>
                <li className={styles['li']}>
                    <Title variant='secondary'>
                        5. Передача данных третьим лицам
                    </Title>
                    <Title variant='tertiary'>
                        Мы не передаем ваши персональные данные третьим лицам, за исключением:
                    </Title>
                    <ul>
                        <li>
                            Требований законодательства РФ.
                        </li>
                        <li>
                            Сервисных провайдеров (хостинг, email-рассылки) с соответствующими договорами.
                        </li>
                    </ul>
                </li>
                <li className={styles['li']}>
                    <Title variant='secondary'>
                        6. Права пользователей (РФ и международные)
                    </Title>
                    <Title variant='tertiary'>
                        Вы имеете право:
                    </Title>
                    <ul>
                        <li>
                            Отозвать согласие на обработку данных (проиходит автоматически при удалении своей учётной записи, вы также теряете доступ к сайту, а ваши данные будут удалены).
                        </li>
                        <li>
                            Запросить информацию о ваших данных.
                        </li>
                        <li>
                            Требовать уточнения или удаления данных.
                        </li>
                        <li>
                            Подать жалобу в уполномоченный орган (для РФ - Роскомнадзор).
                        </li>
                    </ul>
                </li>
                <li className={styles['li']}>
                    <Title variant='secondary'>
                        7. Cookie и отслеживание
                    </Title>
                    <p>
                        Мы используем только необходимые cookie для работы сайта. Вы можете отключить cookie в настройках браузера, но это может повлиять на функциональность сайта.
                    </p>
                </li>
                <li className={styles['li']}>
                    <Title variant='secondary'>
                        8. Международные пользователи
                    </Title>
                    <Title variant='tertiary'>
                        Для пользователей из других стран:
                    </Title>
                    <ul>
                        <li>
                            Мы соблюдаем принципы GDPR в части прав субъектов данных.
                        </li>
                        <li>
                            Данные хранятся на территории РФ.
                        </li>
                        <li>
                            Для рассылок международным пользователям соблюдаем CAN-SPAM Act требования.
                        </li>
                    </ul>
                </li>
                <li className={styles['li']}>
                    <Title variant='secondary'>
                        9. Контакты
                    </Title>
                    <p>
                        По вопросам персональных данных обращайтесь:
                    </p>
                    <ul>
                        <li>
                            <Feedback/>
                        </li>
                    </ul>
                </li>
                <li className={styles['li']}>
                    <Title variant='secondary'>
                        10. Изменения в политике
                    </Title>
                    <p>
                        Мы оставляем право вносить изменения в политику. Актуальная версия всегда доступна на этой странице. 
                    </p>
                </li>
            </ul>
        </div>
    )
}

export default Privacy;
