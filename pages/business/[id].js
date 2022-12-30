import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { SkeletonDetail } from "../../components/skeleton/skeleton";
import SlideShow from "../../components/slideShow/slideShow";
import StarRating from "../../components/starRating/starRating";
import BusinessDetailReviews from "../../components/businessDetail/businessDetailReviews";
import BusinessDetailHours from "../../components/businessDetail/businessDetailHours";
import { PAGE_LIMIT } from "../../constant";
import styles from "../../styles/detail.module.scss";

export default function Detail() {
  const router = useRouter();
  const id = router.query.id;

  const [detail, setDetail] = useState({ data: {} });
  const [review, setReview] = useState({ data: [] });

  const fetchDetail = async () => {
    try {
      setDetail({ ...detail, loading: true });
      const respon = await fetch(`/api/businesses/${id}`);
      if (!respon.ok) throw new Error("error");

      const result = await respon.json();

      if (result.data.error) {
        setDetail({
          ...detail,
          error: result.data.error?.description,
          loading: false,
        });
      } else {
        setDetail({ ...detail, data: result.data, loading: false });
      }
    } catch (error) {
      setDetail({
        ...detail,
        error: "Oop! There is something wrong",
        loading: false,
      });
    }
  };

  const fetchReview = async () => {
    try {
      setReview({ ...review, loading: true });
      const respon = await fetch(
        `/api/businesses/${id}/reviews?limit=${PAGE_LIMIT}`
      );
      if (!respon.ok) throw new Error("error");

      const result = await respon.json();

      if (result.data.error) {
        setReview({
          ...review,
          error: result.data.error?.description,
          loading: false,
        });
      } else {
        setReview({
          ...review,
          data: result.data?.reviews || [],
          loading: false,
        });
      }
    } catch (error) {
      setReview({
        ...review,
        error: "Oop! There is something wrong",
        loading: false,
      });
    }
  };

  useEffect(() => {
    fetchDetail();
    fetchReview();
  }, []);

  if (detail.loading) {
    return <SkeletonDetail isLoading={detail.loading} count={1} />;
  }

  return (
    <>
      <Head>
        <title>Businesses Detail</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.detailContainer}>
          <div>
            <SlideShow images={detail.data?.photos || []} />
            <BusinessDetailHours hours={detail.data?.hours || []} />
          </div>
          <div className={styles.right}>
            <h2 className={styles.title}>{detail.data?.name}</h2>
            <div className={styles.flex}>
              <StarRating rating={detail.data?.rating} />
              <div className={styles.review}>
                {detail.data?.review_count} Reviews
              </div>
            </div>
            <div className={styles.info}>
              Price: {detail.data?.price || "-"}
              <br />
              Categories:&nbsp;
              {detail.data?.categories &&
                detail.data?.categories.reduce((prev, curr, id, arr) => {
                  prev += curr.title;
                  if (id < arr.length - 1) prev += ", ";

                  return prev;
                }, "")}
              <br />
              Phone: {detail.data?.display_phone}
            </div>
            <BusinessDetailReviews
              review={review.data}
              loading={review.loading}
            />
          </div>
        </div>
      </main>
    </>
  );
}
