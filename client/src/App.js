import React, {useEffect, useState} from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import CssBaseline from '@material-ui/core/CssBaseline';
import {SearchBar} from "./components/SearchBar";
import {SearchResultList} from "./components/SearchResultList";
import {searchTweets} from "./lib/SearchTweets";
import {SavedTweetsList} from "./components/SavedTweetList";
import {debounce} from "lodash";
import {createMuiTheme} from '@material-ui/core/styles';
import {makeStyles, ThemeProvider} from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

const theme = createMuiTheme({
    palette: {

        primary: {
            light: '#ffffff',
            main: '#ededed',
            dark: '#bbbbbb',
            contrastText: '#000000',
        },
        secondary: {
            light: '#484848',
            main: '#212121',
            dark: '#000000',
            contrastText: '#ffffff',
        },
    },
});

/**
 * A callback is used here instead of a promise because returning a promise causes the promise to N times
 * Where N is the number of times the function was called before it executed
 * A callback parameter will only be called once
 * @type {debounced}
 */
const searchTweetsDebounced = debounce((q, cb) => {
    searchTweets(q).then(cb);
}, 500)

export const SAVED_TWEETS_LOCALSTORAGE_KEY = 'SAVED_TWEETS';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1
    },
    fillHeight: {
        height: '100%'
    }
}));

function App() {
    const classes = useStyles();

    const [savedTweets, setSavedTweets] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        try {
            const initialSavedTweets = localStorage.getItem(SAVED_TWEETS_LOCALSTORAGE_KEY);
            if (initialSavedTweets) {
                setSavedTweets(JSON.parse(initialSavedTweets))
            }
        } catch (e) {
            console.error("Could not load saved tweets out of localStorage");
            console.error(e);
        }
    }, []);

    useEffect(() => {
        if (searchText) {
            searchTweetsDebounced(searchText, results => {
                setSearchResults(results);
            });
        }
    }, [searchText]);

    useEffect(() => {
        localStorage.setItem(SAVED_TWEETS_LOCALSTORAGE_KEY, JSON.stringify(savedTweets));
    }, [savedTweets]);

    function removeSavedTweet(savedTweet) {
        const index = savedTweets.indexOf(savedTweet);
        if (!(index >= 0)) {
            throw new Error("Cannot removed saved tweet which is not in the saved tweet list")
        }
        setSavedTweets(savedTweets.slice(0, index).concat(savedTweets.slice(index + 1)))
    }

    function saveTweet(tweetToSave) {
        setSavedTweets(savedTweets.concat(tweetToSave));
    }

    return <CssBaseline>
        <ThemeProvider theme={theme}>
            <div className="App" style={{display: 'flex', flexFlow: 'column nowrap', height: '100vh', width: '100vw'}}>
                <SearchBar
                    onSearchTermChanged={newTerm => setSearchText(newTerm)}
                />
                <Grid container className={classes.grow}>
                    <Grid item xs={6} className={classes.fillHeight}>
                        <Typography variant="h5">Search Results</Typography>
                        <Paper className={classes.fillHeight}>
                            <SearchResultList
                                searchResults={searchResults}
                                saveTweet={saveTweet}
                            />
                        </Paper>
                    </Grid>
                    <Grid item xs={6} className={classes.fillHeight}>
                        <Typography variant="h5">Saved Tweets</Typography>
                        <Paper className={classes.fillHeight}>
                            <SavedTweetsList
                                savedTweets={savedTweets}
                                removeSavedTweet={removeSavedTweet}
                                saveTweet={saveTweet}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </ThemeProvider>
    </CssBaseline>;
}

export default App;
