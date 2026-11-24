"""Update the public link and its timestamp together, then commit/push as usual."""
import argparse
from datetime import datetime, timezone, timedelta
import json
from pathlib import Path
import re
from urllib.parse import urlsplit


def update_config(path, url, published=True):
    parts = urlsplit(url)
    if parts.scheme != 'https' or not parts.hostname or parts.username or parts.password:
        raise ValueError('A public HTTPS URL without credentials is required')
    source = path.read_text(encoding='utf-8')
    old = json.loads(re.search(r'publicUrl:\s*("[^"\n]*")', source).group(1))
    source = re.sub(r'publicUrl:\s*"[^"\n]*"', lambda _: 'publicUrl: ' + json.dumps(url), source)
    source = re.sub(r'published:\s*(true|false)', 'published: ' + str(published).lower(), source)
    if old != url:
        stamp = datetime.now(timezone(timedelta(hours=9))).isoformat(timespec='seconds')
        source = re.sub(r'linkUpdatedAt:\s*"[^"\n]*"', lambda _: 'linkUpdatedAt: ' + json.dumps(stamp), source)
    path.write_text(source, encoding='utf-8')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('url')
    parser.add_argument('--closed', action='store_true')
    args = parser.parse_args()
    update_config(Path(__file__).with_name('config.js'), args.url, not args.closed)
