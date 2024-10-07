import React, { useState, useEffect } from 'react';
import Connector from '../Connector/Connector';
import SearchBar from '../SearchBar/SearchBar';
import Tracklist from '../Tracklist/Tracklist';
import Playlist from '../Playlist/Playlist';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './Hero.css';
import backgroundImage from '../../images/compose_03.jpg';

// The Hero is the app, essentially. The hub of functionality.
// Parent of Connector, Playlist, SearchBar and Tracklist components.

export default function Hero({ 
    playlistForm,
    onPlaylistFormChange,
    createPlaylist, 
    onSearch,
    tracklist,
    onTrackSelect,
    selectedTracks 
}) {
    // State to hold the access & refresh tokens
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);

    // Log the access and refresh tokens to the console when changed
    useEffect(() => {
        console.log("Access Token changed:", accessToken);
    }, [accessToken]);

    useEffect(() => {
        console.log("Refresh Token changed:", refreshToken);
    }, [refreshToken]);
    
    // Log a message when the access token is available for API calls
    useEffect(() => {
        if (accessToken) {
            console.log('Access Token is available for API calls.');
        }
    }, [accessToken]);

    // Functions to handle changes to the access and refresh tokens
    const handleAccessTokenChange = (newToken) => {
        console.log("Setting new access token:", newToken);
        setAccessToken(newToken);
    }

    const handleRefreshTokenChange = (newToken) => {
        console.log("Setting new refresh token:", newToken);
        setRefreshToken(newToken);
    }

    return (
        <Container className="HeroContainer"
            style={{ 
                backgroundImage: `
                linear-gradient(
                    90deg, 
                    rgba(2,0,36,1) 0%, 
                    rgba(42,42,124,1) 37%, 
                    rgba(0,212,255,1) 100%
                ), 
                url(${backgroundImage})`,
                backgroundBlendMode: 'overlay', // Blending effect
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                height: '40vh', // Ensures it covers the viewport height
          }}
        >
            <Row> {/* Row one with two columns/sections: 1. Login to Spotify 2. Create Playlist */}
                {/* Connector - user access to Spotify account, retrieve auth token */}
                <Col className="Authentication">
                    <div>
                        <h1>Looking for Music?</h1>
                        <h5><p>Create your Spotify playlists with ease, here.</p></h5>
                        <br/>
                        <Connector 
                            accessToken={accessToken} 
                            refreshToken={refreshToken} 
                            onAccessTokenChange={handleAccessTokenChange} 
                            onRefreshTokenChange={handleRefreshTokenChange}
                        />
                    </div>
                </Col>
                {/* Playlist Creator - name & describe your playlist, public or private and save it */}
                <Col className="PlaylistCreator">
                    <div>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label><h5>This is Your Playlist:</h5></Form.Label>
                                <Form.Control
                                type="text"
                                placeholder="What will you call it?"
                                value={playlistForm.name}
                                onChange={(e) => onPlaylistFormChange('name', e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Control
                                type="text"
                                placeholder="Playlist Description (optional)"
                                value={playlistForm.description}
                                onChange={(e) => onPlaylistFormChange('description', e.target.value)}
                                />
                            </Form.Group>

                            <Form.Check
                                type="checkbox"
                                label="Public"
                                checked={playlistForm.isPublic}
                                onChange={(e) => onPlaylistFormChange('isPublic', e.target.checked)}
                            />
                            <br />
                            <Button variant="primary" onClick={createPlaylist}>
                                Save Playlist to My Spotify
                            </Button>
                        </Form>
                        <br />
                    </div>
                </Col>
            </Row>
            {/* Row two with one column: SearchBar - to search for songs and-or artists */}
            <Row className="mt-3">
                <SearchBar onSearch={onSearch} accessToken={accessToken} refreshToken={refreshToken} />
            </Row>
            <Row> {/* Row three with two columns/sections: 1. Search results (tracklist) 2. Tracks to add to playlist */}
                <Col className="Tracklist">
                    {tracklist.length > 0}
                    <div>
                        <Tracklist tracks={tracklist} onTrackSelect={onTrackSelect} />
                    </div>
                </Col>
                
                <Container className="PlaylistContainer">              
                    <div>
                        <Playlist selectedTracks={selectedTracks} />
                    </div>
                </Container>
                
          </Row>
        </Container>
    );
}