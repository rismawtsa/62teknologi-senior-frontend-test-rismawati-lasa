import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Search from "../components/search/search";
import Table from "../components/table/table";
import PageLimit from "../components/pageLimit/pageLimit";
import Pagination from "../components/pagination/pagination";
import styles from "../styles/home.module.scss";
import { getQueryString } from "../utils/helper";
import {
  BUSINESS_SEARCH_FIELDS,
  BUSINESS_COLUMNS,
  PAGE_LIMIT_OPTIONS,
} from "../constant";

import { useBusinessContext } from "../context/business";

const initialQueries = BUSINESS_SEARCH_FIELDS.reduce((prev, curr) => {
  return { ...prev, [curr.name]: "" };
}, {});

export default function Home() {
  const [business, setBusiness] = useBusinessContext();
  const { data, queries, totalData, currentPage, pageLimit } = business;

  const setQueries = (query) => {
    setBusiness({ ...business, queries: query });
  };

  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async (page) => {
    const queryString = getQueryString({
      ...queries,
      limit: pageLimit,
      offset: pageLimit * (page - 1),
    });
    try {
      setLoading(true);
      setError(null);
      setBusiness({ ...business, data: [] });
      const respon = await fetch(`/api/businesses?${queryString}`);
      if (!respon.ok) throw new Error("error");

      const result = await respon.json();
      if (result.data.error) {
        setError(result.data.error?.description);
      } else {
        setBusiness({
          ...business,
          data: result.data.businesses,
          totalData: result.data.total,
          currentPage: page,
        });
      }
    } catch (error) {
      setError("Oop! There is something wrong");
    } finally {
      setLoading(false);
    }
  };

  const onPageChange = (pageNumber) => {
    fetchData(pageNumber);
  };

  const onPrevClick = () => {
    fetchData(currentPage - 1);
  };

  const onNextClick = () => {
    fetchData(currentPage + 1);
  };

  const handleSearch = () => {
    fetchData(1);
  };

  const handleClearSearch = () => {
    setBusiness({ ...business, queries: initialQueries });
  };

  const handlePageLimitChange = (event) => {
    const { value } = event.target;
    setBusiness({ ...business, pageLimit: value });
  };

  const businesses =
    data &&
    data.map((item, id) => {
      const categories = item.categories
        .map((category) => category.title)
        .join(", ");
      return {
        no: pageLimit * (currentPage - 1) + id + 1,
        name: item.name,
        phone: item.display_phone,
        categories,
        address: item.location.display_address.join(", "),
        rating: item.rating,
        action: (
          <Link className={styles.detail} href={`/business/${item.id}`}>
            Detail
          </Link>
        ),
      };
    });

  return (
    <>
      <Head>
        <title>Search Businesses</title>
        <meta name="description" content="Search the business informations" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.searchContainer}>
          <Search
            fields={BUSINESS_SEARCH_FIELDS}
            queries={queries}
            setQueries={setQueries}
            onSearch={handleSearch}
            onClear={handleClearSearch}
          />
          <PageLimit
            options={PAGE_LIMIT_OPTIONS}
            pageLimit={pageLimit}
            onChange={handlePageLimitChange}
          />
        </div>
        {error && <div className={styles.error}>Error: {error}</div>}
        <Table
          className={styles.table}
          loading={loading}
          error={error}
          column={BUSINESS_COLUMNS}
          data={businesses}
        />
        {data && data.length > 0 && (
          <Pagination
            className={styles.pagination}
            currentPage={currentPage}
            totalData={totalData}
            pageNumberLimit={pageLimit}
            onPrevClick={onPrevClick}
            onNextClick={onNextClick}
            onPageChange={onPageChange}
          />
        )}
      </main>
    </>
  );
}
