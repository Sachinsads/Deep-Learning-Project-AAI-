import React, { Component } from "react";
import axios from "axios";

class Album extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      userId: "",
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchAllAlbums();
  }

  fetchAllAlbums = () => {
    this.setState({ loading: true, error: null });
    axios.get("https://jsonplaceholder.typicode.com/albums")
      .then(response => {
        this.setState({ albums: response.data.slice(0, 100), loading: false }); // Limit to 100
      })
      .catch(err => {
        this.setState({ error: "Failed to fetch albums.", loading: false });
      });
  }

  handleChange = (e) => {
    this.setState({ userId: e.target.value });
  }

  fetchByUser = () => {
    if (!this.state.userId) {
      this.fetchAllAlbums();
      return;
    }
    this.setState({ loading: true, error: null });
    axios.get("https://jsonplaceholder.typicode.com/albums?userId=" + this.state.userId)
      .then(response => {
        this.setState({ albums: response.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: "Failed to fetch albums for this user.", loading: false });
      });
  }

  render() {
    return (
      <div className="card">
        <h2>Album Details</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Fetch albums from JSONPlaceholder API using Axios.
        </p>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <input
            type="number"
            placeholder="Enter userId (e.g., 1)"
            value={this.state.userId}
            onChange={this.handleChange}
            style={{ marginBottom: 0, flex: 3 }}
          />
          <button onClick={this.fetchByUser} style={{ flex: 1 }}>Search</button>
        </div>

        {this.state.loading && <div>Fetching data...</div>}
        {this.state.error && <div style={{ color: 'var(--error)' }}>{this.state.error}</div>}

        <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
          Albums List
        </h3>

        <ul style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '0.5rem' }}>
          {this.state.albums.map(album => (
            <li key={album.id}>
              <span className="badge">ID: {album.id}</span>
              <span className="badge" style={{ background: 'var(--primary)' }}>User: {album.userId}</span>
              <br /><br />
              {album.title}
            </li>
          ))}
          {this.state.albums.length === 0 && !this.state.loading && <li>No albums found.</li>}
        </ul>
      </div>
    );
  }
}

export default Album;
