import css from './MovieSearch.module.css';
import toast from 'react-hot-toast';
import { IoIosSearch } from "react-icons/io";

export default function MovieSearch({ setSearchParams }) {
  function handleSubmit(e) {
    e.preventDefault();
    const value = e.target.elements.search.value;

    if (value.trim() === '') {
      toast.error('Field cannot be empty');
      return;
    }

    setSearchParams({
      search: value
    });
    e.target.reset();
  }

  return (
    <form onSubmit={handleSubmit} className={css['form']}>
      <div className={css['form-row']}>
        <input type="text" name='search' className={css['form-input']} placeholder='Movie name' />
      </div>

      <div className={css['form-row']}>
        <button className={css['form-btn']}><IoIosSearch className='icon' /></button>
      </div>
    </form>
  );
};