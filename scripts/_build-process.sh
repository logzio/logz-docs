SCRIPTS=$PWD/scripts

echo -n Making stale list...
$SCRIPTS/make-stale-list.sh
echo '  done.'

echo -n Running tests...
# $SCRIPTS/run-tests.sh
echo '  done.'