package com.OneMoreSale.OneMoreSaleServer.Dao;

import com.OneMoreSale.OneMoreSaleServer.model.Post;
import org.apache.lucene.search.Query;

import org.apache.lucene.search.Sort;
import org.apache.lucene.search.SortField;
import org.hibernate.search.annotations.SortableField;
import org.hibernate.search.jpa.FullTextEntityManager;
import org.hibernate.search.jpa.FullTextQuery;
import org.hibernate.search.jpa.Search;
import org.hibernate.search.query.dsl.QueryBuilder;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class SearchDao {

    @PersistenceContext
    private EntityManager entityManager;


    public List<Post> searchPost(String keyword, double minPrice,
                                 double maxPrice, String category, int maxPerPage, int pageNumber){
        FullTextEntityManager fullTextEntityManager =
                Search.getFullTextEntityManager(entityManager);
        QueryBuilder queryBuilder =
                fullTextEntityManager.getSearchFactory()
                        .buildQueryBuilder().forEntity(Post.class).get();
        // create query search for price
        Query rangeQuery = queryBuilder
                .range()
                .onField("price")
                .from(minPrice).to(maxPrice)
                .createQuery();
        // create query search for category
        Query categoryQuery = null;
        if (!category.equals("")) {
            categoryQuery = queryBuilder
                    .keyword()
                    .onField("category")
                    .matching(category)
                    .createQuery();
        }else{
            categoryQuery = queryBuilder.all().createQuery();
        }
        // create query search for keyword
        Query similarToText = null;
        if (!keyword.equals("")){
            similarToText = queryBuilder
                    .keyword().fuzzy()
                    .withEditDistanceUpTo(2)
                    .onFields("title", "description")
                    .matching(keyword)
                    .createQuery();
        }else {
            similarToText = queryBuilder.all().createQuery();
        }
        //create final query
        Query finalQuery = queryBuilder.bool()
                    .must(categoryQuery)
                    .must(rangeQuery)
                    .must(similarToText)
                    .createQuery();

        FullTextQuery fullTextQuery = fullTextEntityManager
                .createFullTextQuery(finalQuery, Post.class);

        // sort by score then by post time.
        Sort sort = new Sort(SortField.FIELD_SCORE, new SortField("time", SortField.Type.LONG, true));
        fullTextQuery.setSort(sort);
//        fullTextQuery.setSort(queryBuilder.sort().byScore().andByField("time").desc().createSort());


        fullTextQuery.setMaxResults(maxPerPage);
        fullTextQuery.setFirstResult(maxPerPage * (pageNumber-1));

        @SuppressWarnings("unchecked")
        List<Post> results = (List<Post>) fullTextQuery.getResultList();

        return results;
    }

    public List<Post> homepage() {
        FullTextEntityManager fullTextEntityManager =
                Search.getFullTextEntityManager(entityManager);
        QueryBuilder queryBuilder =
                fullTextEntityManager.getSearchFactory()
                        .buildQueryBuilder().forEntity(Post.class).get();

        Query finalQuery = queryBuilder.all().createQuery();
        FullTextQuery fullTextQuery = fullTextEntityManager
                .createFullTextQuery(finalQuery, Post.class);
        Sort sort = new Sort(SortField.FIELD_SCORE, new SortField("time", SortField.Type.LONG, true));
        fullTextQuery.setSort(sort);
        fullTextQuery.setMaxResults(10);
        fullTextQuery.setFirstResult(10 * (1-1));

        @SuppressWarnings("unchecked")
        List<Post> results = (List<Post>) fullTextQuery.getResultList();

        return results;
    }
}
