# Installation

Most users access blockr through a server-side installation (e.g. [blockr.cloud](https://blockr.cloud)) and don't need to install anything. If you want to run blockr locally, follow the steps below.

## Prerequisites

You need [R](https://www.r-project.org/) (version 4.1 or later) installed on your system.

## Install blockr

```r
install.packages("blockr")
```

## Run blockr

```r
blockr::run_app()
```

This opens an empty blockr canvas in your browser. From here you can add blocks, connect them, and build workflows just like on blockr.cloud.
