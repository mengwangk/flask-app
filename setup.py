import os

from codecs import open
from setuptools import setup, find_packages

import server

ROOT_DIR = os.path.abspath(os.path.dirname(__file__))

with open(os.path.join(ROOT_DIR, 'README.md'), encoding='utf-8') as f:
    long_description = f.read()

def is_pkg(line):
    return line and not line.startswith(('--', 'git', '#'))

def read_requirements(filename):
    with open(os.path.join(ROOT_DIR, filename), encoding='utf-8') as f:
        return [line for line in f.read().splitlines() if is_pkg(line)]


install_requires = read_requirements('requirements.txt')
dev_requires = read_requirements('requirements_dev.txt')

setup(
    name='flask_react_spa',
    version=server.__version__,
    description=server.__doc__,
    long_description=long_description,
    url=server.__homepage__,
    author=server.__author__,
    license=server.__license__,

    # https://pypi.python.org/pypi?%3Aaction=list_classifiers
    classifiers=[
        'Development Status :: 0.0.1',
        'Intended Audience :: Developers',
        'Programming Language :: Python :: 3.7',
    ],
    packages=find_packages(exclude=['tests']),
    install_requires=install_requires,
    extras_require={'test': dev_requires, 'docs': dev_requires},
    include_package_data=True,
    zip_safe=False,
    entry_points='''
        [console_scripts]
        flask=manage:main
    ''',
)
