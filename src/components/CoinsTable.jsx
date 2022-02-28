import { useEffect, useState, useContext } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { TransactionsContext } from '../context/TransactionsContext';
import { saveToLsFav, loadFromLsUser } from '../utils/localstorage';

import { useCoins } from '../hooks/useCoins';
import { CoinsUiTable } from './CoinsUiTable';
import { useFavouritesDb } from '../firebaseConf/useFavouritesDb';
import { useAuth } from '../firebaseConf/useAuth';

const currencySigns = {
  USD: '$',
};

export const CoinsTable = () => {
  const context = useContext(TransactionsContext);
  const [page, setPage] = useState(0);
  const { coins, loading, fetchCoinGecko } = useCoins();
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [favoritesCoins, setFavoritesCoins] = useState(
    context.favoritesCoins,
  );
  const [favActive, setFavActive] = useState(false);
  const [countRows, setCounRows] = useState(12459);
  const [currency, setCurrency] = useState(['USD', '$']);

  // tymczasowo
  const { user, loading: userLoadin } = useAuth();
  const [fav, setFav] = useState([]);

  console.log('favs', fav);

  const { setFavouriteCoin, getFavouritesByUid } = useFavouritesDb();

  useEffect(() => {
    const getFav = async () => {
      const res = await getFavouritesByUid(user.uid);
      setFav(Object.keys(res));
    };

    if (user?.uid) {
      getFav();
    }
  }, [getFavouritesByUid, user?.uid]);

  useEffect(() => {
    fetchCoinGecko({
      id: favActive === true ? favoritesCoins : null,
      page: page,
      rowsPerPage: rowsPerPage,
      currency: currency[0],
    });
  }, [
    fetchCoinGecko,
    favoritesCoins,
    page,
    rowsPerPage,
    favActive,
    currency,
  ]);
  const onPageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // db
  const addToFavorite = (name) => {
    const merged = [...context.favoritesCoins, name];
    context.setFavoritesCoins(merged);
    saveToLsFav(merged);

    setFavouriteCoin({
      uid: loadFromLsUser(),
      coin: name,
    });
  };
  // db
  const removeFromFavorite = (name) => {
    const filteredCoins = context.favoritesCoins.filter(
      (coin) => coin !== name,
    );
    saveToLsFav(filteredCoins);
    context.setFavoritesCoins(filteredCoins);
    console.log(favActive);
    if (favActive === true) {
      setRowsPerPage(filteredCoins.length);
      setCounRows(filteredCoins.length);
      setFavoritesCoins(filteredCoins);
    }

    setFavouriteCoin({
      uid: loadFromLsUser(),
      coin: name,
      isFavourite: false,
    });
  };

  const showFavoritesCoins = () => {
    setFavActive(true);
    setCounRows(context.favoritesCoins.length);
    setRowsPerPage(context.favoritesCoins.length);
    setFavoritesCoins(context.favoritesCoins);
  };

  const showAllCoins = () => {
    setFavActive(false);
    setCounRows(12459);
    setRowsPerPage(50);
  };

  const handleChangeCurrency = (event) => {
    const currencyList = [
      ['USD', '$'],
      ['EUR', '€'],
      ['CNY', 'CN¥'],
      ['JPY', '¥'],
      ['BTC', '₿'],
      ['ETH', 'Ξ'],
      ['PLN', 'PLN'],
    ];

    const findSign = () => {
      for (let item of currencyList) {
        if (item[0] === event.target.value) {
          return item[1];
        }
      }
    };
    let currencySign = findSign();
    setCurrency([event.target.value, currencySign]);
  };

  if (loading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography
        variant="h4"
        align="left"
        style={{ margin: '20px 0 40px 0' }}
      >
        Cryptocurrency Prices by Market Cap
      </Typography>
      <Box
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <ButtonGroup
          variant="outlined"
          aria-label="outlined primary button group"
          style={{ alignText: 'left', width: '80%' }}
        >
          <Button onClick={() => showAllCoins()}>All</Button>
          <Button onClick={() => showFavoritesCoins()}>
            Favorites
          </Button>
        </ButtonGroup>
        <FormControl sx={{ width: '100px', textAlign: 'right' }}>
          <InputLabel id="demo-simple-select-label">
            {currency[0]}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currency[0]}
            label={currency[0]}
            onChange={handleChangeCurrency}
          >
            <MenuItem value={'USD'}>USD</MenuItem>
            <MenuItem value={'EUR'}>EUR</MenuItem>
            <MenuItem value={'JPY'}>JPY</MenuItem>
            <MenuItem value={'CNY'}>CNY</MenuItem>
            <MenuItem value={'PLN'}>PLN</MenuItem>
            <MenuItem value={'BTC'}>BTC</MenuItem>
            <MenuItem value={'ETH'}>ETH</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <CoinsUiTable
        coins={coins}
        favoritesCoins={context.favoritesCoins}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        removeFromFavorite={removeFromFavorite}
        addToFavorite={addToFavorite}
        favActive={favActive}
        countRows={countRows}
        currencySign={currency[1]}
      />
    </Box>
  );
};
