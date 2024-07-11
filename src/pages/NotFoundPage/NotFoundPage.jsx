import css from './NotFoundPage.module.css';
import Section from '../../components/layout/Section/Section.jsx';
import Button from '../../components/Button/Button.jsx';
import { GoArrowRight } from "react-icons/go";

export default function NotFoundPage() {
  return (
    <>
      <Section className='section-404'>
        <div className={css['wrap']}>
          <h1 className={css['title']}>404</h1>
          <div className={css['text']}>Page not found. You can return to the main page</div>
          <Button href='/' text='Go to homepage' icon={<GoArrowRight />} />
        </div>
      </Section>
    </>
  );
};