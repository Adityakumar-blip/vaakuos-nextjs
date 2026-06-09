import re, glob, json, os
from html.parser import HTMLParser

def textlen(html):
    # strip scripts/styles then tags
    h = re.sub(r'<script[\s\S]*?</script>', ' ', html, flags=re.I)
    h = re.sub(r'<style[\s\S]*?</style>', ' ', h, flags=re.I)
    h = re.sub(r'<[^>]+>', ' ', h)
    h = re.sub(r'&[a-z]+;', ' ', h)
    words = re.findall(r'\b\w+\b', h)
    return len(words)

def attr(tag, name):
    m = re.search(name + r'\s*=\s*"([^"]*)"', tag, re.I)
    return m.group(1) if m else None

for f in sorted(glob.glob('pages/*.html')):
    html = open(f, encoding='utf-8', errors='ignore').read()
    name = os.path.basename(f)[:-5]
    title = re.search(r'<title>([^<]*)</title>', html, re.I)
    title = title.group(1).strip() if title else None
    metas = re.findall(r'<meta[^>]+>', html, re.I)
    desc = canon = ogt = ogi = robots = None
    for m in metas:
        n = (attr(m,'name') or attr(m,'property') or '').lower()
        if n=='description': desc = attr(m,'content')
        if n=='og:title': ogt = attr(m,'content')
        if n=='og:image': ogi = attr(m,'content')
        if n=='robots': robots = attr(m,'content')
    cl = re.search(r'<link[^>]*rel="canonical"[^>]*>', html, re.I)
    if cl: canon = attr(cl.group(0),'href')
    h1 = re.findall(r'<h1[^>]*>([\s\S]*?)</h1>', html, re.I)
    h1 = [re.sub(r'<[^>]+>','',x).strip()[:80] for x in h1]
    h2c = len(re.findall(r'<h2[^>]*>', html, re.I))
    h3c = len(re.findall(r'<h3[^>]*>', html, re.I))
    # heading order check
    heads = re.findall(r'<h([1-6])[^>]*>', html, re.I)
    # jsonld
    ld = re.findall(r'<script[^>]*application/ld\+json[^>]*>([\s\S]*?)</script>', html, re.I)
    ldtypes=[]
    for block in ld:
        try:
            d = json.loads(block.strip())
            items = d if isinstance(d,list) else [d]
            for it in items:
                if isinstance(it,dict):
                    t = it.get('@type')
                    ldtypes.append(t)
                    if '@graph' in it:
                        for g in it['@graph']:
                            if isinstance(g,dict): ldtypes.append(g.get('@type'))
        except Exception as e:
            ldtypes.append('PARSE_ERROR')
    imgs = re.findall(r'<img[^>]*>', html, re.I)
    noalt = sum(1 for i in imgs if attr(i,'alt') is None)
    emptyalt = sum(1 for i in imgs if attr(i,'alt')=='')
    links = re.findall(r'<a[^>]+href="([^"]+)"', html, re.I)
    internal = [l for l in links if l.startswith('/') or 'vaakuos' in l or l.startswith('http://localhost')]
    wc = textlen(html)
    print(f"### {name}  ({os.path.getsize(f)} bytes, ~{wc} words)")
    print(f"  title({len(title or '')}): {title}")
    print(f"  desc({len(desc or '')}): {desc}")
    print(f"  canonical: {canon}")
    print(f"  robots-meta: {robots}")
    print(f"  H1({len(h1)}): {h1}")
    print(f"  H2:{h2c} H3:{h3c}  heading-seq: {''.join(heads[:25])}")
    print(f"  JSON-LD types: {ldtypes if ldtypes else 'NONE'}")
    print(f"  imgs:{len(imgs)} missing-alt:{noalt} empty-alt:{emptyalt}")
    print(f"  links:{len(links)} internal:{len(internal)}")
    print(f"  og:title:{'Y' if ogt else 'N'} og:image:{ogi}")
    print()
