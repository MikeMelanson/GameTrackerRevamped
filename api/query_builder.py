def game_filter_build_query(system,status="",pub_string="",dev_string="",condition="",completeness="",region="",ownership="",
                                genre1="",genre2="",price_start="",price_end="",rating_start="",rating_end=""):
    query_start = "SELECT Title FROM Games WHERE "

    if status != "":
        query_start = query_start + "Status = '" + status + "'"
        if pub_string != "":
            query_start = query_start + " AND Publisher LIKE '%" + pub_string + "%'"
        if dev_string != "":
            query_start = query_start + " AND Developer LIKE '%" + dev_string + "%'"
        if condition != "":
            query_start = query_start + " AND Condition = '" + condition + "'"
        if completeness != "":
            query_start = query_start + " AND Completeness = '" + completeness + "'"
        if region != "":
            query_start = query_start + " AND Region = '" + region + "'"
        if ownership != "":
            query_start = query_start + " AND Ownership = '" + ownership + "'"
        if genre1 != "":
            query_start = query_start + " AND Genre1 = '" + genre1 + "'"
        if genre2 != "":
            query_start = query_start + " AND Genre2 = '" + genre2 + "'"
        if price_start != "":
            query_start = query_start + " AND PricePaid > " + price_start
        if price_end != "":
            query_start = query_start + " AND PricePaid < " + price_end
        if rating_start != "":
            query_start = query_start + " AND Rating > " + rating_start
        if rating_end != "":
            query_start = query_start + " AND Rating < " + rating_end

    elif pub_string != "":
        query_start = query_start +"Publisher LIKE '%" + pub_string + "%'"
        if dev_string != "":
            query_start = query_start + " AND Developer LIKE '%" + dev_string + "%'"
        if condition != "":
            query_start = query_start + " AND Condition = '" + condition + "'"
        if completeness != "":
            query_start = query_start + " AND Completeness = '" + completeness + "'"
        if region != "":
            query_start = query_start + " AND Region = '" + region + "'"
        if ownership != "":
            query_start = query_start + " AND Ownership = '" + ownership + "'"
        if genre1 != "":
            query_start = query_start + " AND Genre1 = '" + genre1 + "'"
        if genre2 != "":
            query_start = query_start + " AND Genre2 = '" + genre2 + "'"
        if price_start != "":
            query_start = query_start + " AND PricePaid > " + price_start
        if price_end != "":
            query_start = query_start + " AND PricePaid < " + price_end
        if rating_start != "":
            query_start = query_start + " AND Rating > " + rating_start
        if rating_end != "":
            query_start = query_start + " AND Rating < " + rating_end

    elif dev_string != "":
        query_start = query_start +"Developer LIKE '%" + dev_string + "%'"
        if condition != "":
            query_start = query_start + " AND Condition = '" + condition + "'"
        if completeness != "":
            query_start = query_start + " AND Completeness = '" + completeness + "'"
        if region != "":
            query_start = query_start + " AND Region = '" + region + "'"
        if ownership != "":
            query_start = query_start + " AND Ownership = '" + ownership + "'"
        if genre1 != "":
            query_start = query_start + " AND Genre1 = '" + genre1 + "'"
        if genre2 != "":
            query_start = query_start + " AND Genre2 = '" + genre2 + "'"
        if price_start != "":
            query_start = query_start + " AND PricePaid > " + price_start
        if price_end != "":
            query_start = query_start + " AND PricePaid < " + price_end
        if rating_start != "":
            query_start = query_start + " AND Rating > " + rating_start
        if rating_end != "":
            query_start = query_start + " AND Rating < " + rating_end

    elif condition != "":
        query_start = query_start + "Condition = '" + condition + "'"
        if completeness != "":
            query_start = query_start + " AND Completeness = '" + completeness + "'"
        if region != "":
            query_start = query_start + " AND Region = '" + region + "'"
        if ownership != "":
            query_start = query_start + " AND Ownership = '" + ownership + "'"
        if genre1 != "":
            query_start = query_start + " AND Genre1 = '" + genre1 + "'"
        if genre2 != "":
            query_start = query_start + " AND Genre2 = '" + genre2 + "'"
        if price_start != "":
            query_start = query_start + " AND PricePaid > " + price_start
        if price_end != "":
            query_start = query_start + " AND PricePaid < " + price_end
        if rating_start != "":
            query_start = query_start + " AND Rating > " + rating_start
        if rating_end != "":
            query_start = query_start + " AND Rating < " + rating_end

    elif completeness != "":
        query_start = query_start + "Completeness = '" + completeness + "'"
        if region != "":
            query_start = query_start + " AND Region = '" + region + "'"
        if ownership != "":
            query_start = query_start + " AND Ownership = '" + ownership + "'"
        if genre1 != "":
            query_start = query_start + " AND Genre1 = '" + genre1 + "'"
        if genre2 != "":
            query_start = query_start + " AND Genre2 = '" + genre2 + "'"
        if price_start != "":
            query_start = query_start + " AND PricePaid > " + price_start
        if price_end != "":
            query_start = query_start + " AND PricePaid < " + price_end
        if rating_start != "":
            query_start = query_start + " AND Rating > " + rating_start
        if rating_end != "":
            query_start = query_start + " AND Rating < " + rating_end

    elif region != "":
        query_start = query_start + "Region = '" + region + "'"
        if ownership != "":
            query_start = query_start + " AND Ownership = '" + ownership + "'"
        if genre1 != "":
            query_start = query_start + " AND Genre1 = '" + genre1 + "'"
        if genre2 != "":
            query_start = query_start + " AND Genre2 = '" + genre2 + "'"
        if price_start != "":
            query_start = query_start + " AND PricePaid > " + price_start
        if price_end != "":
            query_start = query_start + " AND PricePaid < " + price_end
        if rating_start != "":
            query_start = query_start + " AND Rating > " + rating_start
        if rating_end != "":
            query_start = query_start + " AND Rating < " + rating_end

    elif ownership != "":
        query_start = query_start + "Ownership = '" + ownership + "'"
        if genre1 != "":
            query_start = query_start + " AND Genre1 = '" + genre1 + "'"
        if genre2 != "":
            query_start = query_start + " AND Genre2 = '" + genre2 + "'"
        if price_start != "":
            query_start = query_start + " AND PricePaid > " + price_start
        if price_end != "":
            query_start = query_start + " AND PricePaid < " + price_end
        if rating_start != "":
            query_start = query_start + " AND Rating > " + rating_start
        if rating_end != "":
            query_start = query_start + " AND Rating < " + rating_end

    elif genre1 != "":
        query_start = query_start + "Genre1 = '" + genre1 + "'"
        if genre2 != "":
            query_start = query_start + " AND Genre2 = '" + genre2 + "'"
        if price_start != "":
            query_start = query_start + " AND PricePaid > " + price_start
        if price_end != "":
            query_start = query_start + " AND PricePaid < " + price_end
        if rating_start != "":
            query_start = query_start + " AND Rating > " + rating_start
        if rating_end != "":
            query_start = query_start + " AND Rating < " + rating_end
    
    elif genre2 != "":
        query_start = query_start + "Genre2 = '" + genre2 + "'"
        if price_start != "":
            query_start = query_start + " AND PricePaid > " + price_start
        if price_end != "":
            query_start = query_start + " AND PricePaid < " + price_end
        if rating_start != "":
            query_start = query_start + " AND Rating > " + rating_start
        if rating_end != "":
            query_start = query_start + " AND Rating < " + rating_end

    elif price_start != "":
        query_start = query_start +"PricePaid > " + price_start
        if price_end != "":
            query_start = query_start + " AND PricePaid < " + price_end
        if rating_start != "":
            query_start = query_start + " AND Rating > " + rating_start
        if rating_end != "":
            query_start = query_start + " AND Rating < " + rating_end

    elif price_end != "":
        query_start = query_start +"PricePaid < " + price_end
        if rating_start != "":
            query_start = query_start + " AND Rating > " + rating_start
        if rating_end != "":
            query_start = query_start + " AND Rating < " + rating_end

    elif rating_start != "":
        query_start = query_start + "Rating > " + rating_start
        if rating_end != "":
            query_start = query_start + " AND Rating < " + rating_end

    elif rating_end != "":
        query_start = query_start + "Rating < " + rating_end

    else:
        query_start = "SELECT Title FROM Games WHERE Wishlist = 0 AND System = '" + system + "'"

    if query_start != "SELECT Title FROM Games WHERE Wishlist = 0 AND System = '" + system + "'":
        query_start += " AND Wishlist = 0 AND System = '" + system + "' ORDER BY Title ASC" 
    else:
        query_start += " ORDER BY Title ASC" 
    
    return query_start