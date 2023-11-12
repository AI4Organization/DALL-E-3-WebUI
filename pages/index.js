import Head from "next/head";
import { useState } from "react";

import styles from "../styles/Home.module.css";

import axios from "axios";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [number, setNumber] = useState(1);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function getImages() {
    const token = process.env.OPENAI_API_KEY;
    if (token != "" && prompt != "") {
      setError(false);
      setLoading(true);
      axios
        .post(`/api/images?t=${token}&p=${prompt}&n=${number}&q=${quality}&s=${size}&st=${style}`)
        .then((res) => {
          setResults(res.data.result);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setError(true);
        });
    } else {
      setError(true);
    }
  }

  const [type, setType] = useState("webp");
  const [quality, setQuality] = useState("standard");
  const [size, setSize] = useState("1024x1024");
  const [style, setStyle] = useState("vivid");

  function download(url) {
    axios
      .post(`/api/download`, { url: url, type: type })
      .then((res) => {
        const link = document.createElement("a");
        link.href = res.data.result;
        link.download = `${prompt}.${type.toLowerCase()}`;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>DALL-E 3 Web UI</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Create images with <span className={styles.titleColor}>DALL-E 3</span>
        </h1>
        <p className={styles.description}>
          <input
            id="prompt"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Prompt"
          />
          <input
            id="number"
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Number of images"
            max="10"
          />
          {"  "}
          <button onClick={getImages}>Get {number} Images</button>
        </p>
        <small>
          const SelectDropdown = ({ id, value, onChange, options }) => (
            <select
              style={{ marginRight: '20px' }}
              id={id}
              value={value}
              onChange={onChange}>
              {options.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
          );

          // Usage:
          <SelectDropdown id="quality" value={quality} onChange={(e) => setQuality(e.target.value)} options={["standard", "hd"]} />
          <SelectDropdown id="size" value={size} onChange={(e) => setSize(e.target.value)} options={["1024x1024", "1792x1024", "1024x1792"]} />
          <SelectDropdown id="style" value={style} onChange={(e) => setStyle(e.target.value)} options={["vivid", "natural"]} />

          Download as:{" "}
          <select
            style={{ marginRight: '20px' }}
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}>
            <option value="webp">Webp</option>
            <option value="png">Png</option>
            <option value="jpg">Jpg</option>
            <option value="gif">Gif</option>
            <option value="avif">Avif</option>
          </select>
        </small>
        <br />
        {error ? (<div className={styles.error}>Something went wrong. Try again.</div>) : (<></>)}
        {loading && <p>Loading...</p>}
        <div className={styles.grid}>
          {results.map((result) => {
            return (
              <div className={styles.card}>
                <img
                  className={styles.imgPreview}
                  src={result.url}
                  onClick={() => download(result.url)}
                />
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
