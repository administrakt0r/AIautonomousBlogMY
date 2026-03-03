import json
import feedparser
import urllib.request
import urllib.error
from datetime import datetime, timedelta, timezone
import time
import email.utils

def parse_date(date_string):
    if not date_string:
        return None
    try:
        parsed_tuple = email.utils.parsedate_tz(date_string)
        if parsed_tuple:
            timestamp = email.utils.mktime_tz(parsed_tuple)
            return datetime.fromtimestamp(timestamp, timezone.utc)
    except Exception:
        pass
    return None

def main():
    with open('C:/Users/Da/Desktop/bloggg/rss-feeds.json', 'r') as f:
        data = json.load(f)

    with open('C:/Users/Da/Desktop/bloggg/published-log.json', 'r') as f:
        log_data = json.load(f)
    
    published_urls = set(log_data.get('published', []))

    now = datetime.now(timezone.utc)
    candidates = []

    print(f"Fetching {len(data['feeds'])} feeds...")

    for feed_info in data['feeds']:
        url = feed_info['url']
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            response = urllib.request.urlopen(req, timeout=10)
            feed_data = response.read()
            feed = feedparser.parse(feed_data)
            
            for entry in feed.entries:
                link = entry.get('link')
                if not link or link in published_urls:
                    continue
                
                # Title
                title = entry.get('title', '')
                
                # Date
                pub_date_str = entry.get('published') or entry.get('updated')
                pub_date = parse_date(pub_date_str)
                
                if pub_date:
                    age_hours = (now - pub_date).total_seconds() / 3600
                    if age_hours <= 48:
                        candidates.append({
                            'source': feed_info['name'],
                            'title': title,
                            'link': link,
                            'date': pub_date.isoformat(),
                            'age_hours': age_hours,
                            'summary': entry.get('summary', '')[:500]
                        })
        except Exception as e:
            print(f"Failed to fetch {url}: {e}")
            continue

    # Sort by age
    candidates.sort(key=lambda x: x['age_hours'])
    
    with open('candidates.json', 'w') as f:
        json.dump(candidates, f, indent=2)

    print(f"Found {len(candidates)} candidate stories within the last 48 hours.")
    
if __name__ == '__main__':
    main()
