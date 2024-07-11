import css from './Button.module.css';
import { isAbsoluteUrl } from '../../js/utils.js';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

export default function Button(
  { text,
    href = null,
    icon = '',
    style = 'default',
    ...props
  }) {

  const cssClass = clsx(
    css['button'],
    style === 'simple' && css['button-simple']
  )

  if (!href) {
    return (
      <button className={cssClass}{...props}>{text} {icon}</button>
    );
  }

  if (isAbsoluteUrl(href)) {
    return (
      <a className={cssClass} href={href} {...props}>{text} {icon}</a>
    );
  }

  return (
    <Link className={cssClass} to={href} {...props}>{text} {icon}</Link>
  );
};