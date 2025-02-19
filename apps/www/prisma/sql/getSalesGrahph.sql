SELECT
      EXTRACT(YEAR FROM createdAt) as year,
      EXTRACT(MONTH FROM createdAt) as month,
     SUM(amount) as value
    -- ROUND(SUM(amount)::numeric, 2) as value
    FROM
      SalesPayments 
    WHERE 
        deletedAt IS NULL
    GROUP BY
      year,
      month
    ORDER BY
      year, month