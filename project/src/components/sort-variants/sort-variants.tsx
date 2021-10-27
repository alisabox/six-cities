import { FormEvent, useEffect, useState } from 'react';
import { SortMode } from '../../const/const';

const ACTIVE_SORT_CLASS = 'places__option--active';

type SortVariantsProps = {
  onSortModeChange: (sort: string | null) => void;
  selectedCity: string;
}

function SortVariants({onSortModeChange, selectedCity}: SortVariantsProps):JSX.Element {
  const [openList, setOpenList] = useState<boolean>(false);

  const handleSortOpen = () => (setOpenList((prevState) =>  !prevState));

  const [selectSort, setSelectSort] = useState<string | null>(SortMode.POPULAR);

  const handleSelectSort = (evt: FormEvent) => {
    const element = evt.target as HTMLInputElement;
    handleSortOpen();
    if (element.classList.contains(ACTIVE_SORT_CLASS)) {
      return;
    }
    setSelectSort(element.textContent);
    element.parentElement?.childNodes.forEach((el) => {
      const child = el as HTMLElement;
      child.classList.remove(ACTIVE_SORT_CLASS);
    });
    element.classList.add(ACTIVE_SORT_CLASS);
    onSortModeChange(element.textContent);
  };

  useEffect(() => {
    setSelectSort(SortMode.POPULAR);
  }, [selectedCity]);


  return (
    <form className="places__sorting" action="/" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span onClick={handleSortOpen} className="places__sorting-type" tabIndex={0}>
        {selectSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul onClick={handleSelectSort} className={`places__options places__options--custom ${openList ? 'places__options--opened' : ''}`}>
        <li className={`places__option ${ACTIVE_SORT_CLASS}`} tabIndex={0}>{SortMode.POPULAR}</li>
        <li className="places__option" tabIndex={0}>{SortMode.PRICE_UP}</li>
        <li className="places__option" tabIndex={0}>{SortMode.PRICE_DOWN}</li>
        <li className="places__option" tabIndex={0}>{SortMode.TOP_RATED}</li>
      </ul>
    </form>
  );
}

export default SortVariants;
