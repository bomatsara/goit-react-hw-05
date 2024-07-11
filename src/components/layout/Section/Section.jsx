import './Section.css';
import Container from '../Container/Container.jsx';
import clsx from 'clsx';

export default function Section({ className, container = true, gap = true, style, children }) {
  return (
    <section style={style} className={
      clsx(
          'section',
          className,
          !gap && 'no-gap'
      )}>
      {container ? <Container>{children}</Container> : children}
    </section>
  );
}