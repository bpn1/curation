#!/usr/bin/env bash
jobName=$1
shift
ssh bp2016n1@sopedu "/home/bp2016n1/scripts/spark.sh -m yarn -e 2 -c $jobName /home/bp2016n1/jars/curation_jobs.jar $@"
