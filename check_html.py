import os
import re

def check_html(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check for unclosed tags (very basic)
    # Just check if <div> and </div> count match
    divs = content.count('<div')
    c_divs = content.count('</div')
    
    if divs != c_divs:
        return f"DIV MISMATCH: {divs} opened, {c_divs} closed"
    
    return "OK"

html_files = [f for f in os.listdir('.') if f.endswith('.html')]
for f in html_files:
    res = check_html(f)
    if res != "OK":
        print(f"{f}: {res}")
    else:
        print(f"{f}: OK")
