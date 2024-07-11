import css from './BackLink.module.css';
import { Link, useLocation } from 'react-router-dom';
import Button from '../Button/Button.jsx';
import { GoArrowRight } from 'react-icons/go';

export default function BackLink() {
  const location = useLocation();
  const backLinkHref = location.state ?? "/movies";

  return <Button href={backLinkHref} style='simple' text='Go back' icon={<GoArrowRight />}  />;
};