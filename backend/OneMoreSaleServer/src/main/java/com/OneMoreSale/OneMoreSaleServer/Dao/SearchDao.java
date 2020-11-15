package com.OneMoreSale.OneMoreSaleServer.Dao;

import com.OneMoreSale.OneMoreSaleServer.model.Post;
import org.apache.lucene.search.Query;

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
        // create query search for keyword
        Query similarToText = queryBuilder
                .keyword().fuzzy()
                .withEditDistanceUpTo(2)
                .onFields("title", "description")
                .matching(keyword)
                .createQuery();
        // create query search for price
        Query rangeQuery = queryBuilder
                .range()
                .onField("price")
                .from(minPrice).to(maxPrice)
                .createQuery();
        // create query search for category
        Query categoryQuery = queryBuilder
                .keyword()
                .onField("category")
                .matching(category)
                .createQuery();
        // define final query
        Query finalQuery = queryBuilder.bool()
                .must(categoryQuery)
                .must(rangeQuery)
                .should(similarToText)
                .createQuery();
        FullTextQuery fullTextQuery = fullTextEntityManager
                .createFullTextQuery(finalQuery, Post.class);

        fullTextQuery.setSort(queryBuilder.sort().byScore().createSort());

        fullTextQuery.setMaxResults(maxPerPage);
        fullTextQuery.setFirstResult(pageNumber);

        @SuppressWarnings("unchecked")
        List<Post> results = (List<Post>) fullTextQuery.getResultList();

        return results;
    }

    public List<Post> searchDemo(String keyword){
        FullTextEntityManager fullTextEntityManager =
                Search.getFullTextEntityManager(entityManager);
        QueryBuilder queryBuilder =
                fullTextEntityManager.getSearchFactory()
                        .buildQueryBuilder().forEntity(Post.class).get();
        Query query = queryBuilder
                .keyword()
                .onFields("title", "description")
                .matching(keyword)
                .createQuery();

        FullTextQuery fullTextQuery = fullTextEntityManager.createFullTextQuery(query, Post.class);

        @SuppressWarnings("unchecked")
        List<Post> results = (List<Post>) fullTextQuery.getResultList();
        return results;

    }

    public List<Post> homepage(){
        return null;
    }

}
