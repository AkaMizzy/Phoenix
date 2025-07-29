/*-----------------------------------------------
|                     Isotope
-----------------------------------------------*/

const isotopeInit = () => {
  const { getData } = window.phoenix.utils;
  const Selector = {
    ISOTOPE_ITEM: '.isotope-item',
    DATA_ISOTOPE: '[data-sl-isotope]',
    DATA_FILTER: '[data-filter]',
    DATA_FILER_NAV: '[data-filter-nav]',
    DATA_GALLERY_COLUMN: '[data-gallery-column]'
  };

  const DATA_KEY = {
    ISOTOPE: 'sl-isotope'
  };
  const ClassName = {
    ACTIVE: 'active'
  };

  if (window.Isotope) {
    const masonryItems = document.querySelectorAll(Selector.DATA_ISOTOPE);
    const columnGallery = document.querySelector(Selector.DATA_GALLERY_COLUMN);
    if (masonryItems.length) {
      masonryItems.forEach(masonryItem => {
        window.imagesLoaded(masonryItem, () => {
          document.querySelectorAll(Selector.ISOTOPE_ITEM).forEach(item => {
            // eslint-disable-next-line no-param-reassign
            item.style.visibility = 'visible';
          });

          const userOptions = getData(masonryItem, DATA_KEY.ISOTOPE);
          const defaultOptions = {
            itemSelector: Selector.ISOTOPE_ITEM,
            layoutMode: 'packery'
          };

          const options = window._.merge(defaultOptions, userOptions);
          const isotope = new window.Isotope(masonryItem, options);
          const addSeparator = (count = 4) => {
            for (let i = 1; i < count; i += 1) {
              const separator = document.createElement('span');
              separator.classList.add(
                `gallery-column-separator`,
                `gallery-column-separator-${i}`
              );
              masonryItem.appendChild(separator);
            }
          };
          const removeSeparator = () => {
            document
              .querySelectorAll('span[class*="gallery-column-separator-"]')
              .forEach(separatorEle => separatorEle.remove());
          };
          if (columnGallery) addSeparator();
          // --------- filter -----------------
          const filterElement = document.querySelector(Selector.DATA_FILER_NAV);
          filterElement?.addEventListener('click', e => {
            const item = e.target.dataset.filter;
            isotope.arrange({ filter: item });
            document.querySelectorAll(Selector.DATA_FILTER).forEach(el => {
              el.classList.remove(ClassName.ACTIVE);
            });
            e.target.classList.add(ClassName.ACTIVE);
            const filteredItems = isotope.getFilteredItemElements();
            if (columnGallery) {
              removeSeparator();
            }
            setTimeout(() => {
              if (columnGallery) {
                addSeparator(
                  filteredItems.length > 4 ? 4 : filteredItems.length
                );
              }
              isotope.layout();
            }, 400);
          });
          // ---------- filter end ------------
          isotope.layout();
          return isotope;
        });
      });
    }
  }
};

export default isotopeInit;
